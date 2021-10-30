import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { OcrNodeModel } from '../models/ocr-node.model';
import { OcrNodeService } from './ocr-node.service';
import { DocumentProps } from '../models/document-props';
import { catchError, map, shareReplay, take, tap } from 'rxjs/operators';
import { OcrTypeModel } from '../models/ocr-type.model';

enum eSTATEFILE {
  'NEW',
  'OCRING',
  'SUCCESS',
}

@Injectable({ providedIn: 'root' })
export class FolderUserStore {
  public readonly ROOT_OcrNode: OcrNodeModel = {
    id: undefined,
    name: 'Root',
    addtime: new Date(),
    modify: new Date(),
    note: '',
    deleted: false,
    owner: 1,
    type: 'folder',
    level: -1,
    isOpen: true,
  };

  private readonly _isLoading = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this._isLoading.asObservable();
  private readonly _treeOcr = new BehaviorSubject<OcrNodeModel[]>([]);
  readonly treeOcr$ = this._treeOcr.asObservable();
  private readonly _activeOcrNode = new BehaviorSubject<OcrNodeModel>(
    this.ROOT_OcrNode
  );
  readonly activeOcrNode$ = this._activeOcrNode.asObservable();
  private readonly _props = new BehaviorSubject<DocumentProps[]>([]);
  readonly props$ = this._props.asObservable();
  private readonly _showCompoentFile = new BehaviorSubject<boolean>(false);
  readonly showComponentFile$ = this._showCompoentFile.asObservable();
  private readonly _ocrTypeModels = new BehaviorSubject<OcrTypeModel[]>([]);
  readonly ocrTypeModels$ = this._ocrTypeModels.asObservable();
  private typeOcr: string;

  constructor(private service: OcrNodeService) {
    this.getDSOcrTypeModel();
  }

  get isLoading(): boolean {
    return this._isLoading.getValue();
  }
  set isLoading(val: boolean) {
    this._isLoading.next(val);
  }

  get treeOcr(): OcrNodeModel[] {
    return this._treeOcr.getValue();
  }
  set treeOcr(val: OcrNodeModel[]) {
    this._treeOcr.next(val);
  }

  get props(): DocumentProps[] {
    return this._props.getValue();
  }
  set props(val: DocumentProps[]) {
    this._props.next(val);
  }

  get activeOcrNode(): OcrNodeModel {
    return this._activeOcrNode.getValue();
  }

  set activeOcrNode(val: OcrNodeModel) {
    this._activeOcrNode.next(val);
  }

  get showComponentFile(): boolean {
    return this._showCompoentFile.getValue();
  }

  set showComponentFile(val) {
    this._showCompoentFile.next(val);
  }

  get ocrTypeModels() {
    return this._ocrTypeModels.getValue();
  }

  set ocrTypeModels(val: OcrTypeModel[]) {
    val.forEach((item) => {
      if (item.isCheck) this.typeOcr = item.value;
    });
    this._ocrTypeModels.next(val);
  }

  getDSOcrTypeModel() {
    const dstype = [];
    let type1 = new OcrTypeModel();
    type1.name = 'transformer';
    type1.value = 'ocr-transformer';
    type1.isCheck = false;
    this.typeOcr = type1.value;
    dstype.push(type1);

    let type2 = new OcrTypeModel();
    type2.name = 'attention';
    type2.value = 'ocr-attention';
    type2.isCheck = false;
    dstype.push(type2);

    let type3 = new OcrTypeModel();
    type3.name = 'tesseract';
    type3.value = 'ocr-tesseract';
    type3.isCheck = true;
    dstype.push(type3);

    this.ocrTypeModels = dstype;
  }

  getOcrNodeById(id: string): Observable<OcrNodeModel> {
    return this.treeOcr$.pipe(
      shareReplay(),
      map((items) => items.find((item) => item.id === id))
    );
  }

  initDefaultValue(
    ocrNodeModel: OcrNodeModel,
    parentOcrNode: OcrNodeModel
  ): OcrNodeModel {
    if (!ocrNodeModel.level)
      ocrNodeModel = { ...ocrNodeModel, level: parentOcrNode.level + 1 };
    if (!ocrNodeModel.isOpen && ocrNodeModel.type === 'folder')
      ocrNodeModel = { ...ocrNodeModel, isOpen: false };
    if (ocrNodeModel.type !== 'folder') {
      ocrNodeModel.ocr = undefined;
      ocrNodeModel.ocring = undefined;
    }
    return ocrNodeModel;
  }

  addTreeOcr(ocrNodeModel: OcrNodeModel, positionParrent: number) {
    const lst = [...this.treeOcr];
    lst.splice(positionParrent + 1, 0, ocrNodeModel);
    this.treeOcr = [...lst];
  }

  removeTreeOcr(id: string) {
    this.treeOcr = this.treeOcr.filter((treeOcr) => treeOcr.id !== id);
  }

  checkFolderIsOpen(folderId: string): { isOpen: boolean; index: number } {
    for (let index = 0; index < this.treeOcr.length; index++) {
      if (this.treeOcr[index].type !== 'folder') continue;
      if (this.treeOcr[index].id === folderId) {
        if (this.treeOcr[index].isOpen) {
          return { isOpen: true, index: index };
        } else {
          return { isOpen: false, index: index };
        }
      }
    }
    return { isOpen: false, index: undefined };
  }

  updateTreeOcr(ocrNodeModel: OcrNodeModel, parentId: string) {
    let parentIsOpen_index: { isOpen: boolean; index: number };
    if (ocrNodeModel.level === 0 || ocrNodeModel.folder === 'Root') {
      parentIsOpen_index = { isOpen: true, index: undefined };
    } else {
      parentIsOpen_index = this.checkFolderIsOpen(parentId);
    }
    if (parentIsOpen_index.isOpen) {
      let treOcr = this.treeOcr.find((item) => item.id === ocrNodeModel.id);
      if (treOcr) {
        const index = this.treeOcr.indexOf(treOcr);
        this.treeOcr[index] = {
          ...treOcr,
          ...ocrNodeModel,
        };
        this.treeOcr = [...this.treeOcr];
      } else {
        if (parentIsOpen_index.index !== undefined) {
          this.addTreeOcr(ocrNodeModel, parentIsOpen_index.index);
        } else {
          const lstFolderLevel0 = this.treeOcr.filter(
            (folder) => folder.level === 0 && folder.type === 'folder'
          );
          this.addTreeOcr(ocrNodeModel, lstFolderLevel0.length - 1);
        }
      }
    }
  }

  async fectAll() {
    this.isLoading = true;
    await this.service
      .getDStreeNode()
      .pipe(shareReplay())
      .toPromise()
      .then((res) => {
        if (res.isvalid) {
          for (let index = 0; index < res.items.length; index++) {
            if (!res.items[index].level) {
              if (res.items[index].type === 'folder') {
                res.items[index] = {
                  ...res.items[index],
                  level: 0,
                  isOpen: false,
                };
              } else {
                res.items[index] = {
                  ...res.items[index],
                  level: 0,
                };
              }
            }
          }
          this.treeOcr = res.items;
          const filesFolderRoot = this.treeOcr.filter(
            (item) => item.type !== 'folder'
          );
          filesFolderRoot.forEach((file) => {
            this.service
              .getInfoById(file.id)
              .pipe(
                take(1),
                tap((res) => {
                  if (res.isvalid) {
                    this.updateFileOrcMode(res.item, res.ocr);
                  }
                })
              )
              .subscribe();
          });
        }
      })
      .catch((err) => console.log(err));

    this.isLoading = false;
  }

  async fetchProps() {
    this.isLoading = true;
    await this.service
      .getDSProps()
      .pipe(
        shareReplay(),
        tap(
          (res) => {
            if (res.isvalid) {
              res.props = res.props.filter(
                (item) => item.required && item.name !== 'content'
              );
              for (let index = 0; index < res.props.length; index++) {
                if (res.props[index]?.isHide) res.props[index].isHide = false;
                if (res.props[index]?.position)
                  res.props[index].position = index;
              }
              this.props = res.props;
            } else {
              this.props = [];
            }
          },
          catchError((err) => {
            console.log(err);
            this.props = [];
            return of([]);
          })
        )
      )
      .toPromise();

    this.isLoading = false;
  }

  async clickFolder(ocrNode: OcrNodeModel) {
    this.isLoading = true;
    await this.service
      .getInfoById(ocrNode.id)
      .pipe(
        tap((res) => {
          if (res.isvalid) {
            if (res.item.childs && res.item.childs.length > 0) {
              res.item.childs.reverse().forEach((item) => {
                item = this.initDefaultValue(item, ocrNode);
                this.updateTreeOcr(item, ocrNode.id);
                if (item.type !== 'folder') {
                  if (item.state !== 0) {
                    this.service
                      .getInfoById(item.id)
                      .pipe(
                        tap((res) => {
                          res.isvalid
                            ? this.updateFileOrcMode(item, res.ocr)
                            : console.log(res);
                        })
                      )
                      .toPromise()
                      .then();
                  }
                }
              });
            }
          }
        }),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      )
      .toPromise();
    this.isLoading = false;
  }

  closeFolder(ocrNode: OcrNodeModel) {
    this.isLoading = true;
    const lst = this.treeOcr;
    const index = this.treeOcr.findIndex((item) => item.id === ocrNode.id);
    if (index > -1) {
      let endIndex = 0;
      for (let i = index + 1; i < lst.length; i++) {
        if (lst[i].level > ocrNode.level) {
          endIndex++;
        } else break;
      }
      lst.splice(index + 1, endIndex);
      this.isLoading = false;
      this.treeOcr = [...lst];
    }
  }

  public checkStateFile(ocrNode: OcrNodeModel) {
    if (ocrNode.state === 1 || ocrNode.state === 2) {
      return eSTATEFILE.OCRING;
    } else if (ocrNode.state === 0) {
      return eSTATEFILE.NEW;
    } else return eSTATEFILE.SUCCESS;
  }

  public updateFileOrcMode(ocrModel: OcrNodeModel, ocr: any) {
    if (this.checkStateFile(ocrModel) === eSTATEFILE.OCRING) {
      ocrModel.ocring = ocr;
    } else if (this.checkStateFile(ocrModel) === eSTATEFILE.SUCCESS) {
      ocrModel.ocr = ocr;
    }
    this.updateTreeOcr(ocrModel, ocrModel.folderid);
  }

  public fechStateFileTimer(ocrModel: OcrNodeModel) {
    const time = timer(1000);
    const sb = time
      .pipe(
        shareReplay(),
        tap((val) => {
          this.service
            .getInfoById(ocrModel.id)
            .pipe(
              take(1),
              tap((res) => {
                if (!res.isvalid) {
                  sb.unsubscribe();
                } else if (res.isvalid) {
                  this.updateFileOrcMode(res.item, res.ocr);
                }
                if (res.item.state === -1) {
                  this.updateFileOrcMode(res.item, res.ocr);
                  if (this.showComponentFile) this.activeOcrNode = res.item;
                  sb.unsubscribe();
                }
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  public async createNewFile(ocrModel: OcrNodeModel, file: File) {
    let isRoot = false;
    if (this.activeOcrNode.name === this.ROOT_OcrNode.name) {
      isRoot = true;
    }
    await this.service
      .uploadFile(ocrModel.id, file, isRoot)
      .pipe(
        tap((res) => {
          if (isRoot) {
            res.item = {
              ...res.item,
              level: 0,
              ocr: undefined,
              ocring: undefined,
            };
            this.treeOcr = [...this.treeOcr.concat(res.item)];
          } else {
            res.item = this.initDefaultValue(res.item, ocrModel);
            this.updateTreeOcr(res.item, res.item.folderid);
          }
        })
      )
      .toPromise();
  }

  public creatFolder(ocrModel: OcrNodeModel, nameFolder: string) {
    let id = ocrModel.id;
    if (ocrModel.name === 'Root') id = 'root';
    return this.service.creatFolder(id, nameFolder).pipe(
      tap((res) => {
        if (ocrModel.isOpen) {
          if (res.isvalid) {
            res.item = this.initDefaultValue(res.item, ocrModel);
            this.updateTreeOcr(res.item, ocrModel.id);
          }
        }
      })
    );
  }

  public deleteTreeOcr(ocrModel: OcrNodeModel) {
    return this.service.deleteTreeOcr(ocrModel.id).pipe(
      tap((res) => {
        if (res.isvalid) {
          this.removeTreeOcr(ocrModel.id);
        }
      })
    );
  }

  public download(fileId: string) {
    return this.service.download(fileId);
  }

  public getFileRawUrl(id: string, page: number) {
    return this.service.getFileRawUrl(id, page);
  }

  public nhanDang(ocrNode: OcrNodeModel) {
    let isForce: boolean = false;
    if (ocrNode.state === -1) {
      isForce = true;
    }
    return this.service.nhanDang(ocrNode.id, isForce, this.typeOcr).pipe(
      tap((res) => {
        if (res.isvalid) {
          this.updateTreeOcr(res.item, ocrNode.folderid);
        }
      })
    );
  }
}

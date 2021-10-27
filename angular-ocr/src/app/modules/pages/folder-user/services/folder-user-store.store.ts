import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { OcrNodeModel } from '../models/ocr-node.model';
import { OcrNodeService } from './ocr-node.service';
import { DocumentProps } from '../models/document-props';
import { catchError, tap } from 'rxjs/operators';

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
    type: 'Root',
    level: -1,
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

  constructor(private service: OcrNodeService) {
    this.fectAll();
    this.fetchProps();
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

  addTreeOcr(ocrNodeModel: OcrNodeModel) {
    this.treeOcr = [...this.treeOcr, ocrNodeModel];
  }

  removeTreeOcr(id: string) {
    this.treeOcr = this.treeOcr.filter((treeOcr) => treeOcr.id !== id);
  }

  updateTreeOcr(ocrNodeModel: OcrNodeModel) {
    let treOcr = this.treeOcr.find((item) => item.id === ocrNodeModel.id);

    if (treOcr) {
      const index = this.treeOcr.indexOf(treOcr);
      this.treeOcr[index] = {
        ...treOcr,
        ...ocrNodeModel,
      };
      this.treeOcr = [...this.treeOcr];
    } else {
      this.addTreeOcr(ocrNodeModel);
    }
  }

  public nhanDang(idFile: string, isForce: boolean = false) {}

  async fectAll() {
    this.isLoading = true;
    await this.service
      .getDStreeNode()
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
                res.items[index] = { ...res.items[index], level: 0 };
              }
            }
          }
          this.treeOcr = res.items;
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
        tap(
          (res) => {
            if (res.isvalid) {
              res.props = res.props.filter((item) => item.required);
              for (let index = 0; index < res.props.length; index++) {
                if (res.props[index]?.isHide) res.props[index].isHide = false;
                if (res.props[index]?.position)
                  res.props[index].position = index;
                this.props = res.props;
              }
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
}

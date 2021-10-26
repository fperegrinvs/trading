import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  of,
  Subject,
  timer,
} from 'rxjs';
import { OcrNodeModel } from '../models/ocr-node.model';
import { catchError, map, shareReplay, takeUntil, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ApiResponseModel } from '../../../model/api-response.model';
import { FileModel } from '../models/file.model';
import {
  Ocr,
  OcrFileProgressingModel,
} from '../models/ocr-file-progressing.model';

const API_PRODUCT = environment.HOST_CORE_CHINHTA_API;

@Injectable({ providedIn: 'root' })
export class FolderUserService implements OnDestroy {
  private _subjectDestroy = new Subject();
  private lstOcrNodeSubject = new BehaviorSubject<OcrNodeModel[]>([]);
  public lstOcrNodel$ = this.lstOcrNodeSubject.asObservable();
  private _lstOcrNode: OcrNodeModel[] = [];
  private isRootFolderSubject = new BehaviorSubject<boolean>(true);
  public isRootFolder$ = this.isRootFolderSubject.asObservable();
  private activeFolderSubject = new BehaviorSubject<OcrNodeModel>(null);
  public activeFolder$ = this.activeFolderSubject.asObservable();
  private activeFileSubject = new BehaviorSubject<FileModel>(null);
  public activeFile$ = this.activeFileSubject.asObservable();
  private subjectShowComponentProgressFile = new BehaviorSubject<boolean>(
    false
  );
  public showComponentProgressFile$: Observable<boolean> =
    this.subjectShowComponentProgressFile.asObservable();
  private lengthColTableSubject = new BehaviorSubject<number>(null);
  public lengthColTable$: Observable<number> =
    this.lengthColTableSubject.asObservable();
  private lengthMetadataSubject = new BehaviorSubject<number>(null);
  public lengthMetadata$: Observable<number> =
    this.lengthMetadataSubject.asObservable();
  private lstOcrFileProgressSubject = new BehaviorSubject<
    OcrFileProgressingModel[]
  >([]);
  public lstOcrFileProgress$ = this.lstOcrFileProgressSubject.asObservable();
  private _lstOcrFileProgress: OcrFileProgressingModel[] = [];

  constructor(private http: HttpClient) {
    this.lengthColTableSubject.next(10);
    this.lengthMetadataSubject.next(6);
  }

  ngOnDestroy(): void {
    this._subjectDestroy.next();
    this._subjectDestroy.complete();
  }

  loadOcrFileProgressById(fileId: string) {
    const time = timer(0, 1500);
    const sb = time
      .pipe(
        takeUntil(this._subjectDestroy),
        shareReplay(),
        tap((val) => {
          this.getInfoFileById(fileId).subscribe(
            (res) => {
              if (res.ocr?.error) {
                console.log(res.ocr.error);
                sb.unsubscribe();
              }
              if (res.item.state === 1 || res.item.state === 2) {
                let notFound = true;
                this._lstOcrFileProgress.forEach((item, index) => {
                  if (item.fileId === fileId) {
                    notFound = false;
                  }
                });
                const ocrFile = new OcrFileProgressingModel();
                ocrFile.fileId = fileId;
                ocrFile.done = false;
                ocrFile.ocr = res.ocr;
                if (notFound) {
                  this._lstOcrFileProgress.push(ocrFile);
                  this.lstOcrFileProgressSubject.next(
                    this.lstOcrFileProgressSubject.getValue().concat(ocrFile)
                  );
                } else {
                  this.updateOcrFileProgress(ocrFile);
                }
              } else if (res.item.state === -1) {
                const ocrFile = new OcrFileProgressingModel();
                ocrFile.fileId = fileId;
                ocrFile.done = true;
                ocrFile.ocr = res.ocr;
                this.updateOcrFileProgress(ocrFile);
                this.removeOcrFileProgressById(res.item.id);
                sb.unsubscribe();
              }
            },
            (error) => {
              sb.unsubscribe();
            }
          );
        })
      )
      .subscribe((val) => {});
  }

  updateOcrFileProgress(ocrFile: OcrFileProgressingModel) {
    this._lstOcrFileProgress.forEach((item, index) => {
      if (item.fileId === ocrFile.fileId) {
        this._lstOcrFileProgress[index] = ocrFile;
        this.lstOcrFileProgressSubject.next(this._lstOcrFileProgress);
      }
    });
  }

  removeOcrFileProgressById(ocrFileId: string) {
    this._lstOcrFileProgress.forEach((item, index) => {
      if (item.fileId == ocrFileId) {
        this._lstOcrFileProgress.splice(index, 1);
        this.lstOcrFileProgressSubject.next(this._lstOcrFileProgress);
      }
    });
  }

  public updateLengthColTable(coltable: number) {
    this.lengthColTableSubject.next(coltable);
  }

  public updateLengthMetadata(colmetadata: number) {
    this.lengthMetadataSubject.next(colmetadata);
  }

  public activeFile(file: FileModel) {
    this.activeFileSubject.next(file);
  }

  public activeFolder(folder: OcrNodeModel) {
    this.isRootFolderSubject.next(false);
    this.activeFolderSubject.next(folder);
  }

  public activeRootFolder() {
    this.isRootFolderSubject.next(true);
  }

  public openShowComponentProgressFile() {
    this.subjectShowComponentProgressFile.next(true);
  }

  public closeShowComponentProgressFile() {
    this.subjectShowComponentProgressFile.next(false);
  }

  public openFolder(folder: OcrNodeModel) {
    this.getInfoById(folder.id)
      .pipe(takeUntil(this._subjectDestroy), shareReplay())
      .subscribe(
        (res) => {
          if (res.ocr?.error) {
            console.log(res.ocr.error);
          }
          const index = this._lstOcrNode.findIndex(
            (item) => item.id === res.item.id
          );
          this._lstOcrNode.forEach((item, index) => {
            if (item.id === res.item.id) {
              if (!this._lstOcrNode[index].childs) {
                this._lstOcrNode[index].childs = [];
              } else {
                this._lstOcrNode[index].childs = res.item.childs;
              }
              this._lstOcrNode[index].modify = res.item.modify;
              this._lstOcrNode[index].deleted = res.item.deleted;
              this.lstOcrNodeSubject.next(this._lstOcrNode);
            }
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updateActiveFolder(folder: OcrNodeModel, folderNew: OcrNodeModel) {
    if (folder.type !== 'folder') return;
    folder.modify = folderNew.modify;
    folder.deleted = folderNew.deleted;
    folder.name = folderNew.name;
    folder.note = folderNew.note;
    folder.parent = folderNew.parent;
    folder.parentid = folderNew.parentid;
    folder.childs = folderNew.childs;
    folder.addtime = folderNew.addtime;
    folder.size = folderNew.size;
    this.lstOcrNodeSubject.next(this._lstOcrNode);
  }

  pushNodeFolderForFromRoot(lst: OcrNodeModel[], folder: OcrNodeModel) {
    if (folder.type !== 'folder') return;
    this._lstOcrNode.forEach((item, index) => {
      if (item.id === folder.parentid) {
        if (folder.deleted)  {
          lst.splice(index,1);
        }
        lst[index].childs.push(folder);
        this.lstOcrNodeSubject.next(this._lstOcrNode);
        return;
      } else if (item.id === folder.parentid) {
        this.pushNodeFolderForFromRoot(item.childs, folder);
      }
    });
  }

  pushNodeFolder(folderParrent: OcrNodeModel, folder: OcrNodeModel) {
    if (folder.type !== 'folder') return;
    folderParrent.childs.push(folder);
    this.lstOcrNodeSubject.next(this._lstOcrNode);
  }

  updateActiveFile(file: FileModel, fileNew: FileModel) {
    if (file.type === 'folder') return;
    file.modify = fileNew.modify;
    file.deleted = fileNew.deleted;
    file.name = fileNew.name;
    file.note = fileNew.note;
    file.addtime = fileNew.addtime;
    file.folderid = fileNew.folderid;
    file.note = fileNew.note;
    file.ocrdate = fileNew.ocrdate;
    file.ocrtime = fileNew.ocrtime;
    file.docid = fileNew.docid;
    file.page_count = fileNew.page_count;
    file.state = fileNew.state;
    file.size = fileNew.size;
    file.taskid = fileNew.taskid;
    this.lstOcrNodeSubject.next(this._lstOcrNode);

  }

  pushFileForFromRoot(lst: OcrNodeModel[], file: FileModel) {
    if (file.type === 'folder') return;
    this._lstOcrNode.forEach((item, index) => {
      if (item.id === file.folderid) {
        if (file.deleted)  {
          lst.splice(index,1);
        }
        lst[index].childs.push(file);
        this.lstOcrNodeSubject.next(this._lstOcrNode);
        return;
      } else if (item.id === file.folderid) {
        this.pushFileForFromRoot(item.childs, file);
      }
    });
  }

  pushFile(folder: OcrNodeModel, file: FileModel) {
    if (file.type !== 'folder') return;
    folder.childs.push(file);
    this.lstOcrNodeSubject.next(this._lstOcrNode);
  }

  //get
  getDSFile() {
    this.http
      .get<{ isvalid: boolean; items: OcrNodeModel[] }>(`${API_PRODUCT}/files/`)
      .pipe(shareReplay())
      .subscribe((res) => {
        this._lstOcrNode = res.items;
        this.lstOcrNodeSubject.next(this._lstOcrNode);
      });
  }

  getInfoById(
    id: string
  ): Observable<{ isvalid: boolean; item: any; ocr: any }> {
    const url = `${API_PRODUCT}/files/${id}`;
    return this.http
      .get<{ isvalid: boolean; item: any; ocr: any }>(url)
      .pipe(shareReplay());
  }

  getInfoFileById(
    id: string
  ): Observable<{ isvalid: boolean; item: FileModel; ocr: any }> {
    const url = `${API_PRODUCT}/files/${id}`;
    return this.http
      .get<{ isvalid: boolean; item: FileModel; ocr: any }>(url)
      .pipe(
        tap((res) => {
          if (res.ocr?.error) console.log(res.ocr.error);
        }),
        shareReplay()
      );
  }

  // create
  creatFolder(
    id: string,
    nameFolder: string
  ): Observable<ApiResponseModel<OcrNodeModel>> {
    const url = `${API_PRODUCT}/files/${id}/${nameFolder}`;
    return this.http.put<ApiResponseModel<OcrNodeModel>>(url, null).pipe(
      shareReplay(),
      tap(
        (res) => {
          if (this.isRootFolderSubject.getValue()) {
            const newlst = this.lstOcrNodeSubject.getValue().slice(0);
            newlst.push(res.item);
            this.lstOcrNodeSubject.next(newlst);
          }
        },
        catchError((res) => {
          console.log(res);
          return of(null);
        })
      )
    );
  }

  public uploadFile(
    folderParrentID: string,
    file: File
  ): Observable<ApiResponseModel<FileModel>> {
    const url = `${API_PRODUCT}/files/upload/${folderParrentID}`;
    const data = new FormData();
    data.set('file', file);
    return this.http
      .post<ApiResponseModel<FileModel>>(url, data)
      .pipe(shareReplay());
  }

  public uploadFileRoot(file: File) {
    const url = `${API_PRODUCT}/files/upload`;
  }

  public getFileRawUrl(id: string, page: number = 0): Observable<Blob> {
    page = page - 1;
    const url = `${API_PRODUCT}/files/image/${id}/${page}`;
    return this.http.get(url, { responseType: 'blob' }).pipe(shareReplay());
  }

  public nhanDang(
    idFile: string,
    isForce: boolean = false
  ): Observable<{ isvalid: boolean; item: FileModel; ocr: Ocr }> {
    let url = `${API_PRODUCT}/files/ocr-attention/${idFile}`;
    if (isForce) url = `${url}/force`;
    return this.http.get<any>(url).pipe(shareReplay());
  }

  public download(id: string): Observable<Blob> {
    const url = `${API_PRODUCT}/files/image/${id}/download`;
    return this.http.get(url, { responseType: 'blob' }).pipe(shareReplay());
  }

  public renameFile(file: FileModel , newName: string): Observable<ApiResponseModel<FileModel>> {
    const url = `${API_PRODUCT}/files/${file.id}/${newName}`;
    return this.http.post<ApiResponseModel<FileModel>>(url, null).pipe(tap(data => {this.updateActiveFile(file, data.item)}),shareReplay());
  }

  public renameFolder(folder: OcrNodeModel , newName: string): Observable<ApiResponseModel<OcrNodeModel>> {
    const url = `${API_PRODUCT}/files/${folder.id}/${newName}`;
    return this.http.post<ApiResponseModel<OcrNodeModel>>(url, null).pipe(tap(data => {this.updateActiveFolder(folder, data.item)}),shareReplay());
  }

  public xoaFolder(folder: OcrNodeModel): Observable<ApiResponseModel<OcrNodeModel>> {
    const url = `${API_PRODUCT}/files/${folder.id}`;
    return this.http.delete<ApiResponseModel<OcrNodeModel>>(url).pipe(tap(data => {this.updateActiveFolder(folder, data.item)}),shareReplay());
  }

  public xoaFile(file: FileModel): Observable<ApiResponseModel<FileModel>> {
    const url = `${API_PRODUCT}/files/${file.id}`;
    return this.http.delete<ApiResponseModel<FileModel>>(url).pipe(tap(data => {this.updateActiveFile(file, data.item)}),shareReplay());
  }

  public phucHoiFile(file: FileModel): Observable<ApiResponseModel<FileModel>> {
    const url = `${API_PRODUCT}/files/restore/${file.id}`;
    return this.http.delete<ApiResponseModel<FileModel>>(url).pipe(tap(data => {this.updateActiveFile(file, data.item)}),shareReplay());
  }

  public phucHoiFolder(folder: OcrNodeModel): Observable<ApiResponseModel<OcrNodeModel>> {
    const url = `${API_PRODUCT}/files/restore/${folder.id}`;
    return this.http.delete<ApiResponseModel<OcrNodeModel>>(url).pipe(tap(data => {this.updateActiveFolder(folder, data.item)}),shareReplay());
  }

  // public moveFile(file: FileModel, fileNew: FileModel): Observable<ApiResponseModel<FileModel>> {
  //   const url = `${API_PRODUCT}/files/restore/${folder.id}`;
  //   return this.http.delete<ApiResponseModel<FileModel>>(url).pipe(tap(data => {this.update(folder, data.item)}),shareReplay());
  // }
  //
  // public moveFolder(file: FileModel, fileNew: FileModel): Observable<ApiResponseModel<OcrNodeModel>> {
  //   const url = `${API_PRODUCT}/files/restore/${folder.id}`;
  //   return this.http.delete<ApiResponseModel<OcrNodeModel>>(url).pipe(tap(data => {this.updateActiveFolder(folder, data.item)}),shareReplay());
  // }
}

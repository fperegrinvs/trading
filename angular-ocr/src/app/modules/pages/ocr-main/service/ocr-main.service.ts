import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { OcrModel } from '../models/ocr-model';
import { Router } from '@angular/router';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import {
  FolderOcrFileStateModel,
  OcrFileStateModel,
} from '../models/ocr-file-state.model';
import { AuthStore } from '../../../auth/auth.store';
import { OcrFolderComponent } from '../ocr-main-list-new/ocr-folder/ocr-folder.component';
import { OcrTask } from '../models/ocr-task.model';
import { forEach } from 'lodash';

const API_PRODUCT = environment.HOST_LAYOUT_API;
const API_CHINHTA_OCR = environment.HOST_OCR_API;
const API_EXTRACT = environment.HOST_EXTRACT_API;

let FolderRoot = new FolderOcrFileStateModel();
FolderRoot._id = undefined;
FolderRoot.name = 'Thư mục gốc';

@Injectable({ providedIn: 'root' })
export class OcrMainService {
  // Ocr Model
  private subject = new BehaviorSubject<OcrModel[]>([]);
  public lstOcrModel$: Observable<OcrModel[]> = this.subject.asObservable();
  private subjectActiveOrcModel = new BehaviorSubject<OcrModel>(null);
  public ocrModelActive$: Observable<OcrModel> =
    this.subjectActiveOrcModel.asObservable();
  // ShowComponentProgressFile
  private subjectShowComponentProgressFile = new BehaviorSubject<boolean>(
    false
  );
  public showComponentProgressFile: Observable<boolean> =
    this.subjectShowComponentProgressFile.asObservable();
  // File
  private subjectActiveFile = new BehaviorSubject<OcrFileStateModel>(null);
  public fileActive$: Observable<OcrFileStateModel> =
    this.subjectActiveFile.asObservable();
  // folder
  private subjectActiveFoder = new BehaviorSubject<FolderOcrFileStateModel>(
    FolderRoot
  );
  public folderActive$: Observable<FolderOcrFileStateModel> =
    this.subjectActiveFoder.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthStore
  ) {}

  getLstOcrModel() {
    this.http
      .get<{ message: string; data: any }>(`${API_PRODUCT}/api/ocrmodels`)
      .pipe(
        map((res) => {
          return res.data.map((model: any) => {
            return {
              _id: model._id,
              files: model.files,
              folders: model.folders,
              createdBy: model.createdBy,
              createdDate: model.createdDate,
              editedDate: model.editedDate,
            };
          });
        }),
        shareReplay()
      )
      .subscribe((transformData) => {
        this.subject.next(transformData);
        console.log(' subject first: ', this.subject.getValue());
      });
  }

  saveSubjectOcrModel(model: OcrModel) {
    const lstOcrModel = this.subject.getValue();
    const ocrIndex = lstOcrModel.findIndex(
      (ocrModel) => ocrModel._id === model._id
    );
    const newLstOcrModel = lstOcrModel.slice(0);
    newLstOcrModel[ocrIndex] = model;
    this.subject.next(newLstOcrModel);
  }

  createOcrModelRootAndAddCreateFolder(newfolder: FolderOcrFileStateModel) {
    if (!newfolder.createdBy) newfolder.createdBy = this.auth.getUsername();
    if (!newfolder.editedBy) newfolder.editedBy = this.auth.getUsername();
    const ocrModel = new OcrModel();
    ocrModel.folders.push(newfolder);
    const url = `${API_PRODUCT}/api/ocrmodels/createOcrModelRoot`;
    return this.http.post(url, ocrModel).pipe(
      tap((res: any) => {
        ocrModel._id = res.data._id;
        ocrModel.createdBy = res.data.createdBy;
        ocrModel.createdDate = res.data.createdDate;
        ocrModel.editedDate = res.data.editedDate;
        const lstOcrModel = this.subject.getValue();
        const newLstOcrModel = lstOcrModel.slice(0);
        newLstOcrModel.push(ocrModel);
        this.subject.next(newLstOcrModel);
      }),
      shareReplay()
    );
  }

  public extractMetadata(data: string): Observable<any> {
    const url = `${API_EXTRACT}/vanban/extract_vanban`;
    return this.http
      .post(url, {
        content: data,
      })
      .pipe(shareReplay());
  }

  public transformer(file: File): Observable<any> {
    let body = new FormData();
    body.append('file', file);
    const url = `${API_CHINHTA_OCR}/api/ocr/attention`;
    return this.http.post(url, body).pipe(shareReplay());
  }

  public getTaskOCR(task: string): Observable<any> {
    const url = `${API_CHINHTA_OCR}/api/task/${task}`;
    return this.http.get(url).pipe(shareReplay());
  }

  public getDocument(documentId: string): Observable<{
    id: string;
    task_id: string;
    created_at: Date;
    updated_at: Date;
    pages: [
      {
        id: string;
        image: string;
        created_at: Date;
        updated_at: Date;
        content: string;
      }
    ];
  }> {
    const url = `${API_CHINHTA_OCR}/api/document/${documentId}`;
    return this.http.get<{
      id: string;
      task_id: string;
      created_at: Date;
      updated_at: Date;
      pages: [
        {
          id: string;
          image: string;
          created_at: Date;
          updated_at: Date;
          content: string;
        }
      ];
    }>(url);
  }

  public uploadFileDocument(file: File) {
    const url = `${API_CHINHTA_OCR}/api/document/`;
    const postData = new FormData();
    postData.append('file', file);
    return this.http
      .post<{ message: string; id: string }>(url, postData)
      .pipe(shareReplay());
  }

  public activeFolder(folder: FolderOcrFileStateModel) {
    this.subjectActiveFoder.next(folder);
  }

  public activeRootFolder() {
    this.subjectActiveFoder.next(FolderRoot);
  }

  public activeFile(file: OcrFileStateModel) {
    if (!file.progressRecognition) file.progressRecognition = new OcrTask();
    this.subjectActiveFile.next(file);
  }

  public activeOcrModel(model: OcrModel) {
    this.subjectActiveOrcModel.next(model);
  }

  public createNewFolderInFolder(
    newFolder: OcrFolderComponent,
    lstStringObjectParent: string[]
  ) {
    const url = `${API_PRODUCT}/api/ocrmodels/createNewFolderInFolder`;
    return this.http.post<{ message: string; data: OcrFolderComponent }>(url, {
      newFolder: newFolder,
      lstStringObjectParent: lstStringObjectParent,
    });
  }

  public findAndUpateFolderIntoOcrModel(
    folder: FolderOcrFileStateModel,
    folderParentId: string
  ) {
    let model = this.subjectActiveOrcModel.getValue();
    if (model !== null && model !== undefined) {
      this.getOcrModel(model._id).subscribe((res) => {
        model = res.data;
        model = this.pushFolderToOcrModel(model, folder, folderParentId);
        this.saveSubjectOcrModel(model);
        const url = `${API_PRODUCT}/api/ocrmodels/findAndUpateFolderOcrModel`;
        return this.http
          .post<{ message: string; data: OcrModel }>(url, {
            ocrModel: model,
          })
          .pipe(shareReplay())
          .subscribe((res) => {
            console.log('findAndUpateFolderOcrModel-', res);
          });
      });
    }
  }

  public findFileAndSaveOcrModel(
    file: OcrFileStateModel,
    folderParentID: string,
    ocrModelId: string
  ) {
    let model = this.subjectActiveOrcModel.getValue();

    this.getOcrModel(ocrModelId).subscribe((res) => {
      model = res.data;
      model.folders = this.replaceFileToOcrModel(
        model.folders,
        file,
        folderParentID
      );

      //this.saveSubjectOcrModel(model);
      const url = `${API_PRODUCT}/api/ocrmodels/findAndUpateFolderOcrModel`;
      return this.http
        .post<{ message: string; data: OcrModel }>(url, {
          ocrModel: model,
        })
        .pipe(shareReplay())
        .subscribe((res) => {});
    });
  }

  public replaceFileToOcrModel(
    folders: FolderOcrFileStateModel[],
    file: OcrFileStateModel,
    folderParentId: string
  ): FolderOcrFileStateModel[] {
    for (let pos = 0; pos < folders.length; pos++) {
      debugger;
      if (folders[pos]._id === folderParentId) {
        for (let index = 0; index < folders[pos].files.length; index++) {
          if (folders[pos].files[index]._id === file._id) {
            folders[pos].files[index] = file;
          }
        }
      }
      if (folders[pos].folders?.length > 0) {
        folders[pos].folders = this.replaceFileToOcrModel(
          folders[pos].folders,
          file,
          folderParentId
        );
      }
    }
    return folders;
  }

  public pushFolderToOcrModel(
    model: OcrModel,
    folder: FolderOcrFileStateModel,
    folderParentId: string
  ): OcrModel {
    for (let item of model.folders) {
      if (item._id === folderParentId) {
        item.folders.push(folder);
        return model;
      }
      if (item.folders?.length > 0) {
        model = this.pushFolderToOcrModel(model, folder, folderParentId);
      }
    }
    return model;
  }

  public findAndUpateFileIntoOcrModel(
    file: OcrFileStateModel,
    folderParentId: string
  ) {
    let model = this.subjectActiveOrcModel.getValue();

    if (model !== null && model !== undefined) {
      this.getOcrModel(model._id).subscribe((res) => {
        model = res.data;
        model = this.pushFileToOcrModel(model, file, folderParentId);
        this.saveSubjectOcrModel(model);
        const url = `${API_PRODUCT}/api/ocrmodels/findAndUpateFolderOcrModel`;
        return this.http
          .post<{ message: string; data: OcrModel }>(url, {
            ocrModel: model,
          })
          .subscribe((res) => {
            console.log('findAndUpateFileIntoOcrModel-', res);
          });
      });
    }
  }

  public pushFileToOcrModel(
    model: OcrModel,
    file: OcrFileStateModel,
    folderParentId: string
  ): OcrModel {
    for (let item of model.folders) {
      if (item._id === folderParentId) {
        item.files.push(file);
        return model;
      }
      if (item.folders?.length > 0) {
        model = this.pushFileToOcrModel(model, file, folderParentId);
      }
    }
    return model;
  }

  public getOcrModel(
    id: string
  ): Observable<{ message: string; data: OcrModel }> {
    const url = `${API_PRODUCT}/api/ocrmodels/${id}`;
    return this.http.get<{ message: string; data: OcrModel }>(url);
  }

  public openShowComponentProgressFile() {
    this.subjectShowComponentProgressFile.next(true);
  }

  public closeShowComponentProgressFile() {
    this.subjectShowComponentProgressFile.next(false);
  }

  public ocrTransformer(
    documentID: string
  ): Observable<{ message: string; task_id: string }> {
    const url = `${API_CHINHTA_OCR}/api/document/${documentID}/ocr-transformer`;
    return this.http.post<{ message: string; task_id: string }>(url, null);
  }

  public deleteDocument(documemntId: string): Observable<{ message: string }> {
    const url = `${API_CHINHTA_OCR}/api/document/${documemntId}/delete`;
    return this.http.delete<{ message: string }>(url);
  }
}

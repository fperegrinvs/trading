import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { OcrModel } from '../models/ocr-model';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { environment } from '../../../../../environments/environment';
import { FolderOcrFileStateModel } from '../models/ocr-file-state.model';
import { AuthStore } from '../../../auth/auth.store';

const API_PRODUCT = environment.HOST_LAYOUT_API;
const API_CHINHTA_OCR = environment.HOST_OCR_API;
const API_EXTRACT = environment.HOST_EXTRACT_API;

@Injectable({ providedIn: 'root' })
export class OcrMainService {
  private subject = new BehaviorSubject<OcrModel[]>(null);

  public lstOcrModel$: Observable<OcrModel[]> = this.subject.asObservable();

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
              id: model._id,
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
        console.log('xxxxxxx subject first: xxxxxx', this.subject.getValue());
      });
  }

  saveOcModel(id: string, ocrModel: OcrModel): any {
    const lstOcrModel = this.subject.getValue();
    // const ocrIndex = lstOcrModel.findIndex((ocrModel) => {
    //   ocrModel._id === id;
    // });
    //
    // const newLstOcrModel = lstOcrModel.slice(0);
    // newLstOcrModel[ocrIndex] = {
    //   ...lstOcrModel[ocrIndex],
    //   ...ocrModel,
    // };

    // this.subject.next(newLstOcrModel);
    //
    // return fromPromise(
    //   fetch(`${API_PRODUCT}/api/ocrmodels`, {
    //     method: 'POST',
    //     body: JSON.stringify(newLstOcrModel),
    //     headers: {
    //       'content-type': 'application/json',
    //     },
    //   })
    // );
  }

  addNew(ocrModel: OcrModel): any {
    // const lstOcrModel = this.subject.getValue();
    // const newLstOcrModel = lstOcrModel.slice(0);
    // newLstOcrModel.push(ocrModel);
    // this.subject.next(newLstOcrModel);
    // const url = `${API_PRODUCT}/api/ocrmodels`;
    // return this.http.post(url, ocrModel);
  }

  createOcrModelRootAndAddCreateFolder(folder: FolderOcrFileStateModel) {
    if (!folder.createdBy) folder.createdBy = this.auth.getUsername();
    if (!folder.editedBy) folder.editedBy = this.auth.getUsername();
    const ocrModel = new OcrModel();
    ocrModel.folders.push(folder);
    const lstOcrModel = this.subject.getValue();
    const newLstOcrModel = lstOcrModel.slice(0);
    newLstOcrModel.push(ocrModel);
    this.subject.next(newLstOcrModel);
    const url = `${API_PRODUCT}/api/ocrmodels/createOcrModelRoot`;
    return this.http.post(url, ocrModel).pipe(shareReplay());
  }

  createFolderAndPushFolderToRootFolder(folder: FolderOcrFileStateModel) {}

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
    const url = `${API_CHINHTA_OCR}api/task/${task}`;
    return this.http.get(url).pipe(shareReplay());
  }

  public uploadFile(
    file: File
  ): Observable<{ message: string; filePathURL: string }> {
    const url = `http://localhost:3001/api/ocrmodels/uploadfile`;
    const postData = new FormData();
    postData.append('file', file, file.name);
    return this.http.post<{ message: string; filePathURL: string }>(
      url,
      postData
    );
  }
}

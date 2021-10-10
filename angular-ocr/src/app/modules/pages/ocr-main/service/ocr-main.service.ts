import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { OcrModel } from '../models/ocr-model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable({ providedIn: 'root' })
export class OcrMainService {
  private subject = new BehaviorSubject<OcrModel[]>([]);

  public lstOcrModel$: Observable<OcrModel[]> = this.subject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getLstOcrModel() {
    this.http
      .get<{ message: string; data: any }>('http://localhost:3001/api/ocrmodels')
      .pipe(
        map((res) => {
          return res.data.map((model: any) => {
            return {
              id: model._id,
              files: model.files,
              folders: model.folders,
              name: model.name,
              createdBy: model.createdBy,
              createdDate: model.createdDate,
              editedDate: model.editedDate,
            };
          });
        })
      )
      .subscribe((transformDatas) => {
        this.subject.next(transformDatas);
      });
  }

  saveOcModel(id: string, ocrModel: OcrModel): Observable<any> {
    const lstOcrModel = this.subject.getValue();
    const ocrIndex = lstOcrModel.findIndex((ocrModel) => {
      ocrModel._id == id;
    });

    const newLstOcrModel = lstOcrModel.slice(0);
    newLstOcrModel[ocrIndex] = {
      ...lstOcrModel[ocrIndex],
      ...ocrModel,
    };

    this.subject.next(newLstOcrModel);

    return fromPromise(
      fetch(`http://localhost:3001/api/ocrmodels`, {
        method: 'POST',
        body: JSON.stringify(newLstOcrModel),
        headers: {
          'content-type': 'application/json',
        },
      })
    );
  }

  addNew(ocrModel: OcrModel): Observable<any> {
    const lstOcrModel = this.subject.getValue();
    const newLstOcrModel = lstOcrModel.slice(0);
    newLstOcrModel.push(ocrModel);
    this.subject.next(newLstOcrModel);
    const url = `http://localhost:3001/api/ocrmodels`;
    return this.http.post(url, ocrModel);
  }

  public extractMetadata(data: string): Observable<any> {
    const url = `http://103.124.95.102:9006/vanban/extract_vanban`;
    return this.http.post(url, {
      content: data,
    });
  }

  public transformer(file: File): Observable<any> {
    let body = new FormData();
    body.append('file', file);
    const url = ` http://103.170.122.74:8000/api/ocr/transformer`;
    return this.http.post(url, body);
  }

  public getTaskOCR(task: string): Observable<any> {
    const url = `http://103.170.122.74:8000/api/task/${task}`;
    return this.http.get(url);
  }

  public uploadFile(file: File): Observable<{ message: string; filePathURL: string }> {
    const url = `http://localhost:3001/api/ocrmodels/uploadfile`;
    const postData = new FormData();
    postData.append('file', file, file.name);
    return this.http.post<{ message: string; filePathURL: string }>(url, postData);
  }
}

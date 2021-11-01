import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OcrNodeModel } from '../models/ocr-node.model';
import { share, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../../../model/api-response.model';
import { FileModel } from '../models/file.model';
import { Ocr } from '../models/ocr-file-progressing.model';
import { DocumentProps } from '../models/document-props';

const API_PRODUCT = environment.HOST_CORE_CHINHTA_API;

@Injectable({ providedIn: 'root' })
export class OcrNodeService {
  constructor(private http: HttpClient) {}

  getDSHeadInfo(): Observable<{ isvalid: boolean; items: DocumentProps[] }> {
    const url = `${API_PRODUCT}/import/docprops`;
    return this.http
      .get<{ isvalid: boolean; items: DocumentProps[] }>(
        `${API_PRODUCT}/files/`
      )
      .pipe(share());
  }

  getDStreeNode(): Observable<{ isvalid: boolean; items: OcrNodeModel[] }> {
    return this.http
      .get<{ isvalid: boolean; items: OcrNodeModel[] }>(`${API_PRODUCT}/files/`)
      .pipe(share());
  }

  getInfoById(
    id: string
  ): Observable<{ isvalid: boolean; item: OcrNodeModel; ocr?: any }> {
    const url = `${API_PRODUCT}/files/${id}`;
    return this.http
      .get<{ isvalid: boolean; item: OcrNodeModel; ocr?: any }>(url)
      .pipe(share());
  }

  uploadFile(
    folderParrentID: string,
    file: File,
    isRoot: boolean = false
  ): Observable<ApiResponseModel<OcrNodeModel>> {
    let url = `${API_PRODUCT}/files/upload/`;
    if (!isRoot) {
      url = `${url}${folderParrentID}`;
    }
    const data = new FormData();
    data.set('file', file);
    return this.http
      .post<ApiResponseModel<OcrNodeModel>>(url, data)
      .pipe(share());
  }

  public getFileRawUrl(id: string, page: number = 0): Observable<Blob> {
    page = page - 1;
    const url = `${API_PRODUCT}/files/image/${id}/${page}`;
    return this.http.get(url, { responseType: 'blob' }).pipe(share());
  }

  public nhanDang(
    idFile: string,
    isForce: boolean,
    typeOcr: string
  ): Observable<{ isvalid: boolean; item: FileModel; ocr: Ocr }> {
    let url = `${API_PRODUCT}/files/${typeOcr}/${idFile}`;
    if (isForce) url = `${url}/force`;
    return this.http.get<any>(url).pipe(shareReplay());
  }

  public download(id: string): Observable<Blob> {
    const url = `${API_PRODUCT}/files/image/${id}/download`;
    return this.http.get(url, { responseType: 'blob' }).pipe(shareReplay());
  }

  public renameTreeOcr(
    id: string,
    newName: string
  ): Observable<ApiResponseModel<OcrNodeModel>> {
    const url = `${API_PRODUCT}/files/${id}/${newName}`;
    return this.http
      .post<ApiResponseModel<OcrNodeModel>>(url, null)
      .pipe(share());
  }

  public deleteTreeOcr(id: string): Observable<ApiResponseModel<OcrNodeModel>> {
    const url = `${API_PRODUCT}/files/${id}`;
    return this.http.delete<ApiResponseModel<OcrNodeModel>>(url).pipe(share());
  }

  public restoreTreeOcr(
    id: string
  ): Observable<ApiResponseModel<OcrNodeModel>> {
    const url = `${API_PRODUCT}/files/restore/${id}`;
    return this.http
      .post<ApiResponseModel<OcrNodeModel>>(url, null)
      .pipe(share());
  }

  public getDSProps(): Observable<{
    isvalid: boolean;
    props: DocumentProps[];
  }> {
    const url = `${API_PRODUCT}/import/docprops`;
    return this.http
      .get<{ isvalid: boolean; props: DocumentProps[] }>(url)
      .pipe(share());
  }

  public creatFolder(
    id: string,
    nameFolder: string
  ): Observable<ApiResponseModel<OcrNodeModel>> {
    const url = `${API_PRODUCT}/files/${id}/${nameFolder}`;
    return this.http.put<ApiResponseModel<OcrNodeModel>>(url, null);
  }
}

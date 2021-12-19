import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";

const API_PATH = environment.api_path;

@Injectable({
  providedIn: "root"
})
export class DocumentProcessService {

  constructor(
    private http: HttpClient
  ) {
  }

  extractMetaData(fileName: string, base64: string): Observable<any> {
    const metaApi = `${API_PATH}/meta`;
    const body = {
      name: fileName,
      file: base64
    };

    return this.http.post(metaApi, body);
  }

  saveDocument(docs: any, attachments: any[]): Observable<any> {
    const docItem = docs;
      docItem.attachments = attachments;
      docItem.docsource = "upload";
      docItem.publishLevel = 0;
      docItem.documentId = docItem.signNumber;

    const postData = {
      docinfo: docItem
    };

    const importUrl = `${API_PATH}/import/doc`;
    return this.http.put(importUrl, postData);
  }

  updateDocument(document: any): Observable<any> {
    const postData = {
      docinfo: document,
      id: document.docidx
    };

    const importUrl = `${API_PATH}/import/doc`;
    return this.http.put(importUrl, postData);
  }

  bookmarkDocument(docId: number): Observable<boolean> {
    const apiPath = `${API_PATH}/searchapi/favorite`;
    const params = new HttpParams()
      .set("document_id", docId);

    return this.http.post<boolean>(apiPath, null, {
      params
    });
  }

  removeBookmark(docId: number): Observable<boolean> {
    const apiPath = `${API_PATH}/searchapi/favorite`;

    const params = new HttpParams()
      .set("document_id", docId);

    return this.http.delete<boolean>(apiPath, {
      params
    });
  }

  getMyBookmarks(): Observable<any> {
    const apiPath = `${API_PATH}/searchapi/favorite`;
    return this.http.get(apiPath);
  }

  addDocumentTag(docId: number, tags: string[]): Observable<boolean> {
    const apiPath = `${API_PATH}/searchapi/tagging`;
    
    const postData = {
      tags,
      document_id: docId
    };

    return this.http.post<boolean>(apiPath, postData);
  }

  deleteDocumentTag(docId: number, tags: string[]): Observable<boolean> {
    const apiPath = `${API_PATH}/searchapi/tagging`;

    const postData = {
      tags,
      document_id: docId
    }

    return this.http.delete<boolean>(apiPath, {
      body: postData
    });
  }

  deleteDocument(docId: number): Observable<any> {
    const apiPath = `${API_PATH}/apiadmin/doc`;

    const body = {
      id: docId
    };

    return this.http.delete<any>(apiPath, {
      body
    });
  }

  

  fetchDownloadLink(docId: number, file: any): string {
    return `${API_PATH}/download?id=${file.type}/${file.name}&docid=${docId}`;
  }
}

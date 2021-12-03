import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

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

  saveDocument(docs: any[], attachments: any[]): Observable<any> {
    const postData = docs.map((val, idx) => {
      const docItem = val;
      docItem.attachments = [attachments[idx]];
      docItem.docsource = "upload";
      docItem.publishLevel = 0;
      docItem.documentId = docItem.signNumber;

      return {
        docinfo: docItem
      };
    });

    const importUrl = `${API_PATH}/import/doc`;
    return this.http.put(importUrl, postData);
  }
}

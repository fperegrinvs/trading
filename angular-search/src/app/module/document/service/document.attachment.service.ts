import {Injectable} from "@angular/core";
import {Attachment} from "../model/attachment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class DocumentAttachmentService {

  constructor(
    private http: HttpClient
  ) {
  }

  addAttachments(documentId: string, attachments: Attachment[]): Observable<boolean> {
    const apiPath = `${environment.api_path}/attachment`;
    return this.http.post<boolean>(apiPath, {
      documentId,
      attachments
    });
  }

  deleteAttachment(documentId: string, attachment: any): Observable<boolean> {
    const apiPath = `${environment.api_path}/attachment`;
    return this.http.delete<boolean>(apiPath, {
      body: {
        documentId,
        attachment: attachment.name
      }
    });
  }
}

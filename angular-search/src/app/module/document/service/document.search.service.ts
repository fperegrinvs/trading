import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {DocumentMetadata} from "../model/document.metadata";
import {HttpClient} from "@angular/common/http";
import {DocPropsResponse} from "../model/response/DocPropsResponse";
import {Observable} from "rxjs";

const API_PATH = environment.api_path;

@Injectable({
  providedIn: "root"
})
export class DocumentSearchService {

  constructor(
    private http: HttpClient
  ) {
  }

  getDocProps(): Observable<DocPropsResponse> {
    const docpropsUrl = `${API_PATH}/import/docprops`;
    return this.http.get<DocPropsResponse>(docpropsUrl);
  }
}

import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {DocumentMetadata} from "../model/document.metadata";
import {HttpClient} from "@angular/common/http";
import {DocPropsResponse} from "../model/response/docprops.response";
import {Observable} from "rxjs";
import {DocumentResponse} from "../model/response/document.response";
import {Category} from "../model/category";

const API_PATH = environment.api_path;
const MOCK_API_PATH = "https://6193d360221e680017450c50.mockapi.io";

@Injectable({
  providedIn: "root"
})
export class DocumentSearchService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCategories(): Observable<Category[]> {
    const categoriesUrl = `${MOCK_API_PATH}/category`;
    return this.http.get<Category[]>(categoriesUrl);
  }

  getDocProps(): Observable<DocPropsResponse> {
    const docpropsUrl = `${API_PATH}/import/docprops`;
    return this.http.get<DocPropsResponse>(docpropsUrl);
  }

  searchDocument(query: string, page: number, size: number): Observable<DocumentResponse> {
    const docSearchUrl = `${API_PATH}/searchapi`;

    const postData = {
      text: query,
      page: page,
      pagesize: size
    }

    return this.http.post<DocumentResponse>(docSearchUrl, postData);
  }
}

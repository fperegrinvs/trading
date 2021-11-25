import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DocPropsResponse} from "../model/response/docprops.response";
import {Observable, Subject, Subscription} from "rxjs";
import {DocumentResponse} from "../model/response/document.response";
import {Category} from "../model/category";
import {SearchPropsResponse} from "../model/response/searchprops.response";

const API_PATH = environment.api_path;
const MOCK_API_PATH = "https://6193d360221e680017450c50.mockapi.io";

@Injectable({
  providedIn: "root"
})
export class DocumentSearchService {
  subjectSearch: Subject<string> = new Subject<string>();
  subjectSelect: Subject<any> = new Subject();
  private currentDocument: any;


  constructor(
    private http: HttpClient
  ) {
  }

  doSearch(term: string): void {
    this.subjectSearch.next(term);
  }

  onSearch(): Subject<string> {
    return this.subjectSearch;
  }

  getCategories(): Observable<Category[]> {
    const categoriesUrl = `${MOCK_API_PATH}/category`;
    return this.http.get<Category[]>(categoriesUrl);
  }

  getDocProps(): Observable<DocPropsResponse> {
    const docpropsUrl = `${API_PATH}/import/docprops`;
    return this.http.get<DocPropsResponse>(docpropsUrl);
  }

  getSearchProps(): Observable<SearchPropsResponse> {
    const searchpropsUrl = `${API_PATH}/searchapi/props`;
    return this.http.get<SearchPropsResponse>(searchpropsUrl);
  }

  searchDocument(query: string, page: number, size: number, searchProps?: any): Observable<DocumentResponse> {
    const docSearchUrl = `${API_PATH}/searchapi`;

    const postData = {
      text: query,
      page: page,
      pagesize: size,
      ...searchProps
    }

    return this.http.post<DocumentResponse>(docSearchUrl, postData);
  }

  selectDocument(document: any): void {
    this.currentDocument = document;
    this.subjectSelect.next(document);
  }

  getCurrentDocument(): any {
    return this.currentDocument;
  }

  onDocumentSelected(): Observable<any> {
    return this.subjectSelect.asObservable();
  }
}

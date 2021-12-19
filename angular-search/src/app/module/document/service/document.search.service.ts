import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DocPropsResponse} from "../model/response/docprops.response";
import {Observable, Subject, Subscription} from "rxjs";
import {DocumentResponse} from "../model/response/document.response";
import {SearchPropsResponse} from "../model/response/searchprops.response";
import {CategoryResponse} from "../model/response/category.response";
import { map } from "rxjs/operators";
import { Document } from "../model/document";
import { DocumentStatus } from "../enum/document.status.enum";

const API_PATH = environment.api_path;
const MOCK_API_PATH = "https://6193d360221e680017450c50.mockapi.io";

@Injectable({
  providedIn: "root"
})
export class DocumentSearchService {
  subjectSearch: Subject<string> = new Subject<string>();
  subjectSelect: Subject<any> = new Subject();
  private currentDocument: any;
  private currentSearchTerm: string = "";


  constructor(
    private http: HttpClient
  ) {
  }

  doSearch(term: string): void {
    this.currentSearchTerm = term;
    this.subjectSearch.next(term);
  }

  onSearch(): Subject<string> {
    return this.subjectSearch;
  }

  getCurrentSearchTerm(): string {
    return this.currentSearchTerm;
  }

  getCategories(bookmarked: boolean, type: number, limit: number): Observable<CategoryResponse> {
    const categoriesUrl = `${API_PATH}/category`;
    let params = new HttpParams()
      .set("level1", type)
      .set("showall", true)
      .set("limit", limit);

    if (bookmarked) {
      params = params.set("bookmarked", bookmarked);
    }

    return this.http.get<CategoryResponse>(categoriesUrl, {
      params
    });
  }

  getDocProps(): Observable<DocPropsResponse> {
    const docpropsUrl = `${API_PATH}/import/docprops`;
    return this.http.get<DocPropsResponse>(docpropsUrl);
  }

  getSearchProps(): Observable<SearchPropsResponse> {
    const searchpropsUrl = `${API_PATH}/searchapi/props`;
    return this.http.get<SearchPropsResponse>(searchpropsUrl);
  }

  searchDocument(bookmark: boolean, query: string, page: number, size: number, sortBy?: string, sortDirection?: string, searchProps?: any): Observable<DocumentResponse> {
    const docSearchUrl = `${API_PATH}/searchapi`;

    const postData = {
      text: query,
      page: page,
      pagesize: size,
      bookmarked: bookmark,
      sort: sortBy || "docidx",
      sort_direction: sortDirection || "desc", 
      ...searchProps
    }

    return this.http.post<DocumentResponse>(docSearchUrl, postData);
  }

  getNeedApproval(page: number, size: number): Observable<DocumentResponse> {
    const docSearchUrl = `${API_PATH}/searchapi`;

    const postData = {
      text: "",
      page: page,
      pagesize: size,
      bookmarked: false,
      needApprove: true
    }

    return this.http.post<DocumentResponse>(docSearchUrl, postData);
  }

  countNeedApproval(): Observable<number> {
    const docSearchUrl = `${API_PATH}/searchapi`;

    const postData = {
      text: "",
      bookmarked: false,
      needApprove: true,
      count: true
    }

    return this.http.post<number>(docSearchUrl, postData);
  }

  selectDocument(document: any): void {
    this.currentDocument = document;
    this.subjectSelect.next(document);
  }

  getCurrentDocument(): any {
    return this.currentDocument;
  }

  getDocumentById(docId: number): any {
    const docSearchUrl = `${API_PATH}/document`;

    const params = new HttpParams()
      .set("docid", docId);

    return this.http.get<any>(docSearchUrl, {params});
  }

  onDocumentSelected(): Observable<any> {
    return this.subjectSelect.asObservable();
  }

  approveDocument(docId: number): Observable<boolean> {
    const apiPath = `${API_PATH}/searchapi/approve`;
    const body = {
      document_id: docId
    };

    return this.http.post<boolean>(apiPath, body);
  }

  rejectDocument(docId: number): Observable<boolean> {
    const apiPath = `${API_PATH}/searchapi/approve`;
    const body = {
      document_id: docId
    }

    return this.http.delete<boolean>(apiPath, {
      body
    });
  }

  getMyDocuments(params: any): Observable<Document[]> {
    const apiPath = `${API_PATH}/mydocs`;
    return this.http.get<Document[]>(apiPath, {
      params
    });
  }

  countMyDocuments(): Observable<any> {
    const apiPath = `${API_PATH}/mydocs`;
    const params = new HttpParams()
      .set("count", true);

      return this.http.get<any>(apiPath, {
        params
      }).pipe(map(res => {
        const total = res.user_docs.doc_count;
        const buckets = res.user_docs.status_count.buckets;
        let newCount = 0;
        let approvedCount = 0;
        let rejectedCount = 0;

        buckets.forEach((bucket: any) => {
          if (bucket.key === DocumentStatus.NEW) {
            newCount = bucket.doc_count;
          } else if (bucket.key === DocumentStatus.APPROVED) {
            approvedCount = bucket.doc_count;
          } else {
            rejectedCount = bucket.doc_count;
          }
        });

        return {
          total: total,
          new: newCount,
          approved: approvedCount,
          rejected: rejectedCount
        }
      }));
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {SystemModule} from "../model/system.module";

const API_PATH = `${environment.api_path}/system`;

@Injectable({
  providedIn: "root"
})
export class SystemService {

  constructor(
    private http: HttpClient
  ) {
  }

  getSystemModules(): Observable<SystemModule[]> {
    const apiPath = `${API_PATH}/modules`;
    return this.http.get<SystemModule[]>(apiPath);
  }
}

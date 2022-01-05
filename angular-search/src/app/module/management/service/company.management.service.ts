import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Company } from "../model/company";

const API_PATH = `${environment.api_path}/management/company`;

@Injectable({
    providedIn: "root"
})
export class CompanyManagementService {

    constructor(
        private http: HttpClient
    ) {

    }

    getAllCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>(API_PATH);
    }
}
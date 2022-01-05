import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Role } from "../model/role";

const API_PATH = `${environment.api_path}/management/role`;


@Injectable({
    providedIn: "root"
})
export class RoleManagementService {

    constructor(
        private http: HttpClient
    ) {

    }

    getAllRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(API_PATH);
    }
}
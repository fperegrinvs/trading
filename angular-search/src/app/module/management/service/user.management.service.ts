import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../model/user";

const API_PATH = `${environment.api_path}/management/user`;

@Injectable({
    providedIn: "root"
})
export class UserManagementService {

    constructor(
        private http: HttpClient
    ) {}

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(API_PATH);
    }
}
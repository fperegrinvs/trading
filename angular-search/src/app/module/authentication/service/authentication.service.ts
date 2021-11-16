import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  getToken(): string {
    return "c3704d92684fbb49a6d22957f7837e65419b1a4f";
  }
}

import {Injectable} from "@angular/core";
import { CookieAuth } from "../model/cookie.auth";
import {CookieService} from "ngx-cookie-service";
import { environment } from "src/environments/environment";

const DOMAIN = environment.DOMAIN_COOKIES;

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  constructor(
    private cookieService: CookieService
  ) {

  }

  public getCookieAuthInfo(): CookieAuth | null {
    const token = this.cookieService.get("token");
    if (!token && environment.production) {
      return null;
    }
    const userString = this.cookieService.get("user");
    let user = null;
    if (userString) {
      user = JSON.parse(userString);
    }

    if (!user && !environment.production) {
      user = JSON.parse('{"isvalid":true,"token":"c3704d92684fbb49a6d22957f7837e65419b1a4f","canchange":true,"candelete":true,"canadd":true,"cantk":true,"cantkmeta":true,"cantkcate":true,"cantkname":true,"ismanager":true,"name":"Khoa Ngo","isnew":true,"timeout":null,"username":"khoango"}');
    }

    const auth: CookieAuth = {
      user,
      token
    }

    return auth;
  }

  getToken(): string {
    /*if (!environment.production) {
      return "c3704d92684fbb49a6d22957f7837e65419b1a4f";
    }*/

    const cookieAuth = this.getCookieAuthInfo();
    if (!cookieAuth) {
      // return to login
      window.location.href = environment.home_path;
    } else {

    }
    return cookieAuth?.token || "";
  }

  private clearAuthData() {
    this.cookieService.delete('token', '/', DOMAIN);
    this.cookieService.delete('expiration', '/', DOMAIN);
    this.cookieService.delete('user', '/', DOMAIN);
  }

  logout(): void {
    this.clearAuthData();
    // return to login
    window.location.href = environment.home_path;
  }
}

import {Injectable} from "@angular/core";
import { CookieAuth } from "../model/cookie.auth";
import {CookieService} from "ngx-cookie-service";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../model/user.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

const DOMAIN = environment.DOMAIN_COOKIES;

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private _token: any;
  private _tokenTimer: any;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
    this.currentUser = this.currentUserSubject.asObservable();
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

  login(username: string, password: string) {
    // console.log('aloooo')
    // const url = environment.api_path + "/api-token-auth"
    const url = "https://devcore.chinhta123.com/api-token-auth";
    // console.log(username, password);
    return this.http
      .post<User>(url, {username: username, password: password})
      .pipe(
        tap((res: User) => {
          if (res.isvalid) {
            const token = res.token;

            this._token = token;
            // console.log(res);
            if (token) {
              const expiresInDuration = res.timeout;
              let dateExpiresInDuration: any = null;
              if (expiresInDuration) {
                this.setAuthTimer(expiresInDuration);
                const now = new Date();
                let expirationDate = new Date(
                  now.getTime() + expiresInDuration * 100
                );
                dateExpiresInDuration = expirationDate;
              }
              this.saveAuthData(token, dateExpiresInDuration, res);
              this.currentUserSubject.next(res)
            }
          }
        })
      )
  }

  private setAuthTimer(duration: number) {
    this._tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, user: User) {
    this.cookieService.set("token", token);
    this.cookieService.set("expiration", expirationDate?.toISOString());
    this.cookieService.set("user", JSON.stringify(user));
  }

  logout(): void {
    this.clearAuthData();
    // return to login
    window.location.href = environment.home_path;
  }
}

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {User, UserAuth} from '../model/user.model';
import {environment} from "../../../environments/environment";
import {Router} from '@angular/router';

const AUTH_DATA = 'auth_data';
const API_PRODUCT = environment.HOST_LAYOUT_API;

@Injectable({
  providedIn: 'root',
})
export class AuthStore {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  private subject = new BehaviorSubject<User>(null);
  user$: Observable<User> = this.subject.asObservable();
  private _token: string;
  private _tokenTimer: any;
  private _userId: string;

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
  }

  getToken() {
    return this._token;
  }

  getUserID() {
    return this._userId;
  }

  login(username: string, password: string) {
    const url = `${API_PRODUCT}/api/user/login`;
    return this.http.post<UserAuth>(url, {username: username, password: password})
      .subscribe((res: UserAuth) => {
          const token = res.token;
          this._token = token;
          if (token) {
            this.getUserMe(token);
            const expiresInDuration = res.expiresIn;
            this.setAuthTimer(expiresInDuration);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            this.saveAuthData(token, expirationDate, this._userId);
          }
        }, error => {
          throwError('Tên đăng nhập hoặc mật khẩu không hợp lệ');
        }
      )
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this._token = authInformation.token;
      this._userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.getUserMe(this._token);
    }
  }

  logout() {
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA);
    this._token = null;
    this._userId = null;
    clearTimeout(this._tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  createUser(user: User) {
    const url = `${API_PRODUCT}/api/user/login`;
  }

  getUserMe(token: string) {
    const url = `${API_PRODUCT}/api/user/me`;
    return this.http.get<{ message: string, data: { user: User } }>(url)
      .subscribe((res) => {
          this.subject.next(res.data.user);
          this.router.navigate(["/"]);
        }
      )
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private setAuthTimer(duration: number) {
    this._tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}

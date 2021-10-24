import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserAuth } from '../model/user.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

const API_PRODUCT = environment.HOST_CORE_CHINHTA_API;

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  private subject = new BehaviorSubject<UserAuth>(null);
  user$: Observable<UserAuth> = this.subject.asObservable();
  private _token: string;
  private _tokenTimer: any;
  private _username: string;

  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
  }

  getUsername() {
    return this._username;
  }

  getToken() {
    return this._token;
  }

  login(username: string, password: string) {
    const url = `${API_PRODUCT}/api-token-auth`;
    return this.http
      .post<UserAuth>(url, { username: username, password: password })
      .pipe(
        tap((res: UserAuth) => {
          if (res.isvalid) {
            const token = res.token;
            res.username = username;
            this._token = token;
            if (token) {
              const expiresInDuration = res.timeout;
              let dateExpiresInDuration: Date = null;
              if (expiresInDuration) {
                this.setAuthTimer(expiresInDuration);
                const now = new Date();
                const expirationDate = new Date(
                  now.getTime() + expiresInDuration * 1000
                );
                dateExpiresInDuration = expirationDate;
              }
              this.saveAuthData(token, dateExpiresInDuration, res);
              this.subject.next(res);
            }
          }
        })
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    if (authInformation.expirationDate) {
      const now = new Date();
      const expiresIn =
        authInformation.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.setAuthTimer(expiresIn / 1000);
      }
    }
    this.subject.next(authInformation.user);
    this._token = authInformation.token;
    this._username = authInformation.user?.username;
  }

  logout() {
    this.subject.next(null);
    this.clearAuthData();
    this._token = null;
    clearTimeout(this._tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const user: UserAuth = JSON.parse(localStorage.getItem('user'));
    if (!token) {
      return;
    }
    return {
      token: token,
      expirationDate: expirationDate ? new Date(expirationDate) : null,
      user: user,
    };
  }

  private saveAuthData(token: string, expirationDate: Date, user: UserAuth) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate?.toISOString());
    localStorage.setItem('user', JSON.stringify(user));
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');
  }

  private setAuthTimer(duration: number) {
    this._tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}

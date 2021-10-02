import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';

const AUTH_DATA = 'auth_data';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private subject = new BehaviorSubject<User>(null);

  user$: Observable<User> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    const user = localStorage.getItem(AUTH_DATA);

    if (user) {
      this.subject.next(JSON.parse(user));
    }
  }

  login(username: string, password: string): Observable<User> {
    if (username == 'admin' && password == '@Admin123@') {
      const user = new User();
      user.id = '1';
      user.username = 'admin';
      user.name = 'Phong';
      user.avatarUrl = '';
      this.subject.next(user);
      return of(user);
    } else {
      return throwError('Tên đăng nhập hoặc mật khẩu không hợp lệ');
    }
  }

  logout() {
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA);
  }
}

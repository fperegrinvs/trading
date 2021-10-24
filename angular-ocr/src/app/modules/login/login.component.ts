import { MessagesService } from './../messages/messages.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../auth/auth.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  username: any = '';
  password: any = '';
  destroySubject = new Subject();

  constructor(
    private router: Router,
    private message: MessagesService,
    private auth: AuthStore
  ) {}

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  ngOnInit() {}

  login() {
    this.auth
      .login(this.username, this.password)
      .pipe(takeUntil(this.destroySubject))
      .subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        (error) => {
          if (error.error) {
            this.message.showErrors(error.error.msg);
          }
        }
      );
  }
}

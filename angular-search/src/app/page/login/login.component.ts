import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/module/authentication/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginInfo = {
    username: "",
    password: ""
  }
  destroySubject = new Subject();

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  ngOnInit() {}

  login() {
    console.log(this.loginInfo);
    this.authService
      .login(this.loginInfo.username, this.loginInfo.password)
      .pipe(takeUntil(this.destroySubject))
      .subscribe(
        () => {
          this.router.navigateByUrl('/app/search');
        },
        (error: any) => {
          console.log(error)
        }
      )
  }
}

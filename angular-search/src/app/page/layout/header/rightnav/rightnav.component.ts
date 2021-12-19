import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/module/authentication/model/user.model';
import { AuthenticationService } from 'src/app/module/authentication/service/authentication.service';

@Component({
  selector: 'RightNav',
  templateUrl: './rightnav.component.html',
  styleUrls: ['./rightnav.component.scss']
})
export class RightNavComponent implements OnInit {

  userName: string = "";
  isShow: boolean = false;
  user: User | undefined;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userInfo = this.authService.getCookieAuthInfo();

    this.userName = userInfo?.user.name || "";
    this.user = userInfo?.user;
  }

  logout(): void {
    this.authService.logout();
  }

  goToMyDocs(): void {
    this.router.navigate(["app", "mydoc"]);
  }
}

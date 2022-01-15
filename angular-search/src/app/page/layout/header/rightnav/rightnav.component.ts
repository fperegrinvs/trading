import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/module/authentication/model/user.model';
import { AuthenticationService } from 'src/app/module/authentication/service/authentication.service';
import {SystemService} from "../../../../module/system/service/system.service";
import {SystemModule} from "../../../../module/system/model/system.module";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'RightNav',
  templateUrl: './rightnav.component.html',
  styleUrls: ['./rightnav.component.scss']
})
export class RightNavComponent implements OnInit {

  userName: string = "";
  isShow: boolean = false;
  user: User | undefined;
  modules: SystemModule[] = [];

  moduleGraphicMap: any = {
    1: {
      icon: "bx-server.svg",
      background: "rgb(147, 197, 253)"
    },
    2: {
      icon: "bxs-book-content.svg",
      background: "rgb(110, 231, 183)"
    }
  }

  constructor(
    private authService: AuthenticationService,
    private systemService: SystemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userInfo = this.authService.getCookieAuthInfo();

    this.userName = userInfo?.user.name || "";
    this.user = userInfo?.user;

    this.systemService.getSystemModules()
        .subscribe(res => {
          this.modules = res;
        });
  }

  logout(): void {
    this.authService.logout();
  }

  goToMyDocs(): void {
    this.router.navigate(["app", "mydoc"]);
  }

  goToModule(module: SystemModule): void {
    const isProd = environment.production;

    const url = isProd ? module.prodUrl : module.qaUrl;
    window.location.href = url;
  }
}

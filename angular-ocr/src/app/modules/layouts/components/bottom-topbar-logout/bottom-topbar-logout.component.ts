import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthStore } from 'src/app/modules/auth/auth.store';

@Component({
  selector: 'app-bottom-topbar',
  templateUrl: 'bottom-topbar-logout.component.html',
  styleUrls: ['./bottom-topbar-logout.component.scss'],
})
export class BottomTopbarLogoutComponent implements OnInit {
  constructor(public auth: AuthStore, private router: Router) {}

  ngOnInit() {}

   async logout() {
     await this.auth.logout();
  }
}

import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthStore } from 'src/app/modules/auth/auth.store';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-bottom-topbar',
  templateUrl: 'bottom-topbar-logout.component.html',
  styleUrls: ['./bottom-topbar-logout.component.scss'],
})
export class BottomTopbarLogoutComponent implements OnInit {
  constructor(
    public auth: AuthStore,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit() {}

  async logout() {
    await this.auth.logout();
    setTimeout(() => this._document.defaultView.location.reload(), 0);
  }
}

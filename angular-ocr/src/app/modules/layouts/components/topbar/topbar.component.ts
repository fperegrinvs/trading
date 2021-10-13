import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AuthStore} from 'src/app/modules/auth/auth.store';

@Component({
  selector: 'app-topbar',
  templateUrl: 'topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopBarComponent implements OnInit {
  constructor(public auth: AuthStore, private router: Router) {
  }

  ngOnInit() {
  }

  clickLogin() {
    this.router.navigateByUrl('/login');
  }
}

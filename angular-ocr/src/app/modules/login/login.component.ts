import {MessagesService} from './../messages/messages.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthStore} from '../auth/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  username: any = '';
  password: any = '';

  constructor(private router: Router, private message: MessagesService, private auth: AuthStore) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.username, this.password);
  }
}

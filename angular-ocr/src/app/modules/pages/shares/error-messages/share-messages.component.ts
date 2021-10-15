import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ShareMessagesService} from './share-messages.service';

@Component({
  selector: 'app-share-messages-error',
  templateUrl: './share-messages.component.html',
  styleUrls: ['./share-messages.component.scss'],
})
export class ShareMessagesComponent implements OnInit {
  showMessages = false;

  errors$: Observable<string[]> | undefined;

  constructor(public service: ShareMessagesService) {
  }

  ngOnInit() {
    this.errors$ = this.service.errors$.pipe(tap(() => (this.showMessages = true)));
  }

  onClose() {
    this.showMessages = false;
  }
}

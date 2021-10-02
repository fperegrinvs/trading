import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-messages-error',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  showMessages = false;

  errors$: Observable<string[]> | undefined;

  constructor(public messagesService: MessagesService) {}

  ngOnInit() {
    this.errors$ = this.messagesService.errors$.pipe(tap(() => (this.showMessages = true)));
  }

  onClose() {
    this.showMessages = false;
  }
}

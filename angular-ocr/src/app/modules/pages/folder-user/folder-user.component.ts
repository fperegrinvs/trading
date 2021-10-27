import { Component, OnInit } from '@angular/core';
import { FolderUserStore } from './services/folder-user-store.store';

@Component({
  selector: 'app-folder-user',
  templateUrl: 'folder-user.component.html',
})
export class FolderUserComponent implements OnInit {
  constructor(public serviceStore: FolderUserStore) {}

  ngOnInit() {}
}

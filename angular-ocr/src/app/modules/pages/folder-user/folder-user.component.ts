import { Component, OnInit } from '@angular/core';
import { FolderUserService } from './services/folder-user.service';

@Component({
  selector: 'app-folder-user',
  templateUrl: 'folder-user.component.html',
})
export class FolderUserComponent implements OnInit {
  constructor(public service: FolderUserService) {}

  ngOnInit() {
    this.service.getDSFile();
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { ShareMessagesService } from '../../shares/error-messages/share-messages.service';
import { FolderUserStore } from '../services/folder-user-store.store';

@Component({
  selector: 'app-add-new-folder-user-dialog-component',
  templateUrl: 'add-new-folder-user-dialog.component.html',
  styleUrls: ['add-new-folder-user-dialog.component.scss'],
})
export class AddNewFolderUserDialogComponent implements OnInit {
  nameFolder: string;
  constructor(
    public serivceStore: FolderUserStore,
    public dialogRef: MatDialogRef<AddNewFolderUserDialogComponent>,
    public errorMessage: ShareMessagesService
  ) {}

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  createFolder() {
    this.serivceStore
      .creatFolder(this.serivceStore.activeOcrNode, this.nameFolder)
      .pipe(take(1))
      .subscribe(
        (res) => {
          if (res.isvalid) {
            this.close();
          }
        },
        (error) => {
          this.errorMessage.showErrors(error.msg);
        }
      );
  }

  @HostListener('document:keydown.enter', ['$event'])
  onKeydownEnterHandler(event: KeyboardEvent) {
    this.createFolder();
  }
}

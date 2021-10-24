import { Component, OnDestroy, OnInit } from '@angular/core';
import { FolderUserService } from '../services/folder-user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShareMessagesService } from '../../shares/error-messages/share-messages.service';

@Component({
  selector: 'app-add-new-folder-user-dialog-component',
  templateUrl: 'add-new-folder-user-dialog.component.html',
  styleUrls: ['add-new-folder-user-dialog.component.scss'],
})
export class AddNewFolderUserDialogComponent implements OnInit, OnDestroy {
  nameFolder: string;
  isRootFolder: boolean;
  subjectDestroy = new Subject();

  constructor(
    public service: FolderUserService,
    public dialogRef: MatDialogRef<AddNewFolderUserDialogComponent>,
    public errorMessage: ShareMessagesService
  ) {}

  ngOnDestroy(): void {
    this.subjectDestroy.next();
    this.subjectDestroy.complete();
  }

  ngOnInit() {
    this.service.isRootFolder$
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((res) => {
        this.isRootFolder = res;
      });
  }

  close() {
    this.dialogRef.close();
  }

  createFolder() {
    let folderId = 'root';
    if (!this.isRootFolder) {
      this.service.activeFolder$.subscribe((res) => {
        folderId = res.id;
      });
    }
    this.service
      .creatFolder(folderId, this.nameFolder)
      .pipe(takeUntil(this.subjectDestroy))
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
}

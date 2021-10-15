import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OcrMainService } from '../service/ocr-main.service';
import { AuthStore } from '../../../auth/auth.store';
import { ShareMessagesService } from '../../shares/error-messages/share-messages.service';
import { FolderOcrFileStateModel } from '../models/ocr-file-state.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-ocr-main-add-folder-dialog',
  templateUrl: 'ocr-main-add-folder-dialog.component.html',
})
export class OcrMainAddfolderDialogComponent implements OnInit {
  nameFolder: string;
  folder: FolderOcrFileStateModel = new FolderOcrFileStateModel();

  constructor(
    public dialogRef: MatDialogRef<OcrMainAddfolderDialogComponent>,
    private service: OcrMainService,
    private auth: AuthStore,
    private message: ShareMessagesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log('data', this.data);
    if (this.data.item?._id) this.folder = this.data;
  }

  createFolder() {
    if (!this.validation()) return;
    const model = this.prepareModel();
    this.createOcrModelRootAndAddCreateFolder(model);
  }

  createFolderAndPushFolderToRootFolder() {}

  createOcrModelRootAndAddCreateFolder(model: FolderOcrFileStateModel) {
    this.service
      .createOcrModelRootAndAddCreateFolder(model)
      .pipe(
        tap(
          (res) => {
            this.dialogRef.close(res);
          },
          catchError((error) => {
            console.log(error);
            this.message.showErrors(error);
            return throwError(error);
          })
        )
      )
      .subscribe();
  }

  prepareModel() {
    const model = new FolderOcrFileStateModel();
    model._id = this.data._id;
    model.folders = [];
    model.files = [];
    model.name = this.nameFolder;
    return model;
  }

  validation(): boolean {
    if (this.nameFolder === '' || !this.nameFolder) {
      this.message.showErrors('Tên thư mục không được bỏ trống');
      return false;
    }
    return true;
  }

  close() {
    this.dialogRef.close();
  }
}

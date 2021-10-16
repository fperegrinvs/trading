import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OcrMainService } from '../service/ocr-main.service';
import { AuthStore } from '../../../auth/auth.store';
import { ShareMessagesService } from '../../shares/error-messages/share-messages.service';
import { FolderOcrFileStateModel } from '../models/ocr-file-state.model';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-ocr-main-add-folder-dialog',
  templateUrl: 'ocr-main-add-folder-dialog.component.html',
})
export class OcrMainAddfolderDialogComponent implements OnInit {
  nameFolder: string;
  folder: FolderOcrFileStateModel = new FolderOcrFileStateModel();
  activeFolder$: Observable<FolderOcrFileStateModel>;

  constructor(
    public dialogRef: MatDialogRef<OcrMainAddfolderDialogComponent>,
    private service: OcrMainService,
    private auth: AuthStore,
    private message: ShareMessagesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.activeFolder$ = this.service.folderActive$;
    this.activeFolder$.subscribe((res) => {
      if (res._id) this.folder = res;
    });
  }

  createFolder() {
    if (!this.validation()) return;
    const model = this.prepareModel();
    this.service.ocrModelActive$.subscribe((res) => {
      if (res !== null && res !== undefined) {
        this.service.findAndUpateFolderIntoOcrModel(model, this.folder._id);
        setTimeout(() => {
          this.dialogRef.close(res);
        }, 1000);
      } else {
        this.createOcrModelRootAndAddCreateFolder(model);
      }
    });
  }

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
    model.createdDate = new Date();
    model.editedBy = this.auth.getUsername();
    model.createdBy = this.auth.getUsername();
    model.createdDate = new Date();
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

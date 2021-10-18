import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OcrMainService } from '../service/ocr-main.service';
import { AuthStore } from '../../../auth/auth.store';
import { ShareMessagesService } from '../../shares/error-messages/share-messages.service';
import { FolderOcrFileStateModel } from '../models/ocr-file-state.model';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

@Component({
  selector: 'app-ocr-main-add-folder-dialog',
  templateUrl: 'ocr-main-add-folder-dialog.component.html',
})
export class OcrMainAddfolderDialogComponent implements OnInit, OnDestroy {
  nameFolder: string;
  activeFolder$: Observable<FolderOcrFileStateModel>;
  subjectDestroy = new Subject();

  constructor(
    public dialogRef: MatDialogRef<OcrMainAddfolderDialogComponent>,
    private service: OcrMainService,
    private auth: AuthStore,
    private message: ShareMessagesService
  ) {}

  ngOnDestroy(): void {
    this.subjectDestroy.next();
    this.subjectDestroy.complete();
  }

  ngOnInit() {
    this.activeFolder$ = this.service.folderActive$.pipe();
  }

  createFolder() {
    if (!this.validation()) return;
    this.activeFolder$
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((folderActive) => {
        const folderNew = this.prepareNotRootFolderModel();
        if (folderActive._id) {
          this.service.ocrModelActive$
            .pipe(takeUntil(this.subjectDestroy))
            .subscribe((res) => {
              if (res !== null && res !== undefined) {
                this.service.findAndUpateFolderIntoOcrModel(
                  folderNew,
                  folderActive._id
                );
                setTimeout(() => {
                  this.dialogRef.close(res);
                }, 1000);
              }
            });
        } else {
          this.createOcrModelRootAndAddCreateFolder(folderNew);
        }
      });
  }

  createOcrModelRootAndAddCreateFolder(folderNew: FolderOcrFileStateModel) {
    this.service
      .createOcrModelRootAndAddCreateFolder(folderNew)
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

  prepareNotRootFolderModel() {
    const model = new FolderOcrFileStateModel();
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

import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ShareMessagesService } from '../../shares/error-messages/share-messages.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-dialog.component',
  templateUrl: 'delete-dialog.component.html',
  styleUrls: ['delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit, OnDestroy {
  nameFolder: string;
  isRootFolder: boolean;
  subjectDestroy = new Subject();

  typeSvg: string;
  title: string;
  nameObject: string = '';
  nameBtnCancle: string;
  nameBtnOk: string;

  info: string;
  luuy: string;
  deleteAll: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    public errorMessage: ShareMessagesService,
    public translate: TranslateService,
    public cd: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.subjectDestroy.next();
    this.subjectDestroy.complete();
  }

  ngOnInit() {
    if (this.data?.typeSvg) {
      this.typeSvg = this.data.typeSvg;
    }

    if (this.data?.title) {
      this.title = this.data.title;
    } else {
      this.title = this.translate.instant('ACTIONDIALOG.XOADOITUONG');
    }

    if (this.data?.nameObject) {
      this.nameObject = this.data.nameObject;
    } else {
      this.nameObject = '';
    }

    if (this.data?.nameBtnOk) {
      this.nameBtnOk = this.data.nameBtnOk;
    } else {
      this.nameBtnOk = this.translate.instant('ACTIONDIALOG.XACNHAN');
    }

    if (this.data?.nameBtnCancle) {
      this.nameBtnCancle = this.data.nameBtnCancle;
    } else {
      this.nameBtnCancle = this.translate.instant('ACTIONDIALOG.HUY');
    }

    if (this.data?.info) {
      this.info = this.data.info;
    } else {
      this.info = this.translate.instant('ACTIONDIALOG.INFODELETE');
    }

    if (this.data?.luuy) {
      this.luuy = this.data.luuy;
    } else {
      this.luuy = this.translate.instant('ACTIONDIALOG.LUUYDELETE');
    }
  }

  close() {
    this.dialogRef.close();
  }

  ok() {
    this.dialogRef.close({ deleteAll: this.deleteAll });
  }

  @HostListener('document:keydown.enter', ['$event'])
  onKeydownEnterHandler(event: KeyboardEvent) {
    this.ok();
  }
}

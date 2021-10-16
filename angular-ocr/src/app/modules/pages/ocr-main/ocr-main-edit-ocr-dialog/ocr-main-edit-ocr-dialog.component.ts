import { OcrModel } from './../models/ocr-model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OcrMainService } from '../service/ocr-main.service';
import {
  FolderOcrFileStateModel,
  OcrFileStateModel,
} from '../models/ocr-file-state.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ocr-main-edit-ocr-dialog',
  templateUrl: 'ocr-main-edit-ocr-dialog.component.html',
  styleUrls: ['./ocr-main-edit-ocr-dialog.component.scss'],
})
export class OcrMainEditOcrDialogComponent implements OnInit {
  files: File[] = [];
  ocrModel: OcrModel;

  activeFolder$: Observable<FolderOcrFileStateModel>;

  constructor(
    public dialogRef: MatDialogRef<OcrMainEditOcrDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OcrModel,
    public ocrService: OcrMainService
  ) {}

  ngOnInit() {
    //create new data
    if (!this.data) {
      this.ocrModel = new OcrModel();
    } else {
      this.ocrModel = this.data;
    }

    this.activeFolder$ = this.ocrService.folderActive$;
  }

  close() {
    this.dialogRef.close();
  }
}

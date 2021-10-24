import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FolderUserService } from '../services/folder-user.service';
import { OcrModel } from '../../ocr-main/models/ocr-model';
import { Observable } from 'rxjs';
import { FolderOcrFileStateModel } from '../../ocr-main/models/ocr-file-state.model';
import { OcrNodeModel } from '../models/ocr-node.model';

@Component({
  selector: 'add-new-file-dialog',
  templateUrl: 'add-new-file-dialog.component.html',
  styleUrls: ['add-new-file-dialog.component.scss'],
})
export class AddNewFileDialogComponent implements OnInit {
  files: File[] = [];
  ocrModel: OcrModel;

  activeFolder$: Observable<OcrNodeModel>;

  constructor(
    public dialogRef: MatDialogRef<AddNewFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OcrModel,
    public ocrService: FolderUserService
  ) {}

  ngOnInit() {
    //create new data
    if (!this.data) {
      this.ocrModel = new OcrModel();
    } else {
      this.ocrModel = this.data;
    }

    this.activeFolder$ = this.ocrService.activeFolder$;
  }

  close() {
    this.dialogRef.close();
  }
}

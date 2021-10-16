import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OcrFileStateModel } from '../models/ocr-file-state.model';
import { OcrModel } from '../models/ocr-model';
import { OcrMainService } from '../service/ocr-main.service';

@Component({
  selector: 'ocr-uploading-dialog',
  templateUrl: 'ocr-uploading-dialog.component.html',
  styleUrls: ['./ocr-uploading-dialog.component.scss'],
})
export class OcrUploadingDialogComponent implements OnInit {
  isHovering: boolean;
  files: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<OcrUploadingDialogComponent>,
    public service: OcrMainService
  ) {}

  ngOnInit() {}

  fileBrowserHander(event: any) {}

  async handleDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  dropzoneState(event: any) {
    this.isHovering = event;
  }
}

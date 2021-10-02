import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ocr-uploading-dialog',
  templateUrl: 'ocr-uploading-dialog.component.html',
  styleUrls: ['./ocr-uploading-dialog.component.scss'],
})
export class OcrUploadingDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<OcrUploadingDialogComponent>) {}
  isHovering: boolean;
  files: File[] = [];

  @Output('files') eventFiles = new EventEmitter<File[]>();

  ngOnInit() {}

  fileBrowserHander(event: any) {}

  handleDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
    this.eventFiles.emit(this.files);
  }

  dropzoneState(event: any) {
    this.isHovering = event;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'file-uploading-dialog',
  templateUrl: 'file-uploading-dialog.component.html',
  styleUrls: ['file-uploading-dialog.component.scss'],
})
export class FileUploadingDialogComponent implements OnInit {
  isHovering: boolean;
  files: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<FileUploadingDialogComponent>,
  ) {}

  ngOnInit() {}

  fileBrowserHander($event: any) {
    for (let i = 0; i < $event.target.files.length; i++) {
      this.files.push($event.target.files.item(i));
    }
  }

  async handleDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  dropzoneState(event: any) {
    this.isHovering = event;
  }
}

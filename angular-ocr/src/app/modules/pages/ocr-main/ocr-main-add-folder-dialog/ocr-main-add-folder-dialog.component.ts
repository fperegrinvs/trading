import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-ocr-main-add-folder-dialog',
  templateUrl: 'ocr-main-add-folder-dialog.component.html',
})
export class OcrMainAddfolderDialogComponent implements OnInit {
  nameFolder: string;

  constructor(public dialogRef: MatDialogRef<OcrMainAddfolderDialogComponent>) {
  }

  ngOnInit() {

  }

  createFolder() {

  }

  close() {
    this.dialogRef.close();
  }
}

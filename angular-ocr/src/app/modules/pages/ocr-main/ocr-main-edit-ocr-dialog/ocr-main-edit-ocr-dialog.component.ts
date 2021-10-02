import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OcrMainAddFileDialogComponent } from '../ocr-main-add-file-dialog/ocr-main-add-file-dialog.component';

@Component({
  selector: 'app-ocr-main-edit-ocr-dialog',
  templateUrl: 'ocr-main-edit-ocr-dialog.component.html',
  styleUrls: ['./ocr-main-edit-ocr-dialog.component.scss'],
})
export class OcrMainEditOcrDialogComponent implements OnInit {
  tabIndex: number = 0;
  files: File[] = [];
  constructor(public dialogRef: MatDialogRef<OcrMainAddFileDialogComponent>) {}

  ngOnInit() {}

  getIndexTab(tabIndex: number) {
    this.tabIndex = tabIndex;
  }

  getFiles(files: File[]) {
    this.files = files;
  }

  selected = new FormControl(0);
  addTab(selectAfterAdding: boolean, file: File) {
    this.files.push(file);

    if (selectAfterAdding) {
      this.selected.setValue(this.files.length - 1);
    }
  }

  removeTab(index: number) {
    this.files.splice(index, 1);
  }
}

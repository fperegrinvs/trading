import {OcrModel} from './../models/ocr-model';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-ocr-main-edit-ocr-dialog',
  templateUrl: 'ocr-main-edit-ocr-dialog.component.html',
  styleUrls: ['./ocr-main-edit-ocr-dialog.component.scss'],
})
export class OcrMainEditOcrDialogComponent implements OnInit {
  tabIndex: number = 0;
  files: File[] = [];
  ocrModel: OcrModel;
  showTrichXuatMetadata: boolean = false;
  selected = new FormControl(0);

  constructor(public dialogRef: MatDialogRef<OcrMainEditOcrDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: OcrModel) {
  }

  ngOnInit() {
    //create new data
    if (!this.data) {
      this.ocrModel = new OcrModel();
    } else {
      this.ocrModel = this.data;
    }
  }

  getIndexTab(tabIndex: number) {
    this.tabIndex = tabIndex;
  }

  getFiles(files: File[]) {
    this.files = files;
  }

  addTab(selectAfterAdding: boolean, file: File) {
    this.files.push(file);

    if (selectAfterAdding) {
      this.selected.setValue(this.files.length - 1);
    }
  }

  removeTab(index: number) {
    this.files.splice(index, 1);
  }

  getOrcModel($event: OcrModel) {
    this.ocrModel = $event;
    this.showTrichXuatMetadata = true;
  }

  close() {
    this.dialogRef.close();
  }
}

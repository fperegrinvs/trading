import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ocr-main-add-file-dialog',
  templateUrl: 'ocr-main-add-file-dialog.component.html',
  styleUrls: ['./ocr-main-add-file-dialog.component.scss'],
})
export class OcrMainAddFileDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<OcrMainAddFileDialogComponent>) {}
  ngOnInit() {}
}

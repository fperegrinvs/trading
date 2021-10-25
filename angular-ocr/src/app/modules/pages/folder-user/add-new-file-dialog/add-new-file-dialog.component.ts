import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FolderUserService } from '../services/folder-user.service';
import { Observable, Subject } from 'rxjs';
import { OcrNodeModel } from '../models/ocr-node.model';

@Component({
  selector: 'add-new-file-dialog',
  templateUrl: 'add-new-file-dialog.component.html',
  styleUrls: ['add-new-file-dialog.component.scss'],
})
export class AddNewFileDialogComponent implements OnInit {
  files: File[] = [];
  subjectDestroy = new Subject();
  activeFolder$: Observable<OcrNodeModel>;

  constructor(
    public dialogRef: MatDialogRef<AddNewFileDialogComponent>,
    public ocrService: FolderUserService
  ) {}

  ngOnInit() {
    this.activeFolder$ = this.ocrService.activeFolder$;
  }

  close() {
    this.dialogRef.close();
  }
}

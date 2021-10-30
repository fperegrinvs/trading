import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FolderUserStore } from '../services/folder-user-store.store';

@Component({
  selector: 'add-new-file-dialog',
  templateUrl: 'add-new-file-dialog.component.html',
  styleUrls: ['add-new-file-dialog.component.scss'],
})
export class AddNewFileDialogComponent implements OnInit {
  files: File[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddNewFileDialogComponent>,
    public serviceStore: FolderUserStore,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }
}

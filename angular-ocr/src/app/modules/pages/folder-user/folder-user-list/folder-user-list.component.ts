import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FolderOcrFileStateModel } from '../../ocr-main/models/ocr-file-state.model';
import { AddNewFolderUserDialogComponent } from '../add-new-folder-user-dialog/add-new-folder-user-dialog.component';
import { FolderUserService } from '../services/folder-user.service';
import { OcrNodeModel } from '../models/ocr-node.model';
import { AddNewFileDialogComponent } from '../add-new-file-dialog/add-new-file-dialog.component';

@Component({
  selector: 'app-folder-user-list',
  templateUrl: 'folder-user-list.component.html',
  styleUrls: ['./folder-user-list.component.scss'],
})
export class FolderUserListComponent implements OnInit, OnDestroy {
  isFullSreenComponent: boolean = false;

  constructor(public dialog: MatDialog, public service: FolderUserService) {}

  ngOnInit() {}

  ngOnDestroy(): void {}

  addNew() {
    const dialogRef = this.dialog.open(AddNewFileDialogComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '80vw',
      maxHeight: '100vh',
    });
  }

  addNewFoler() {
    const data = new FolderOcrFileStateModel();
    const dialogRef = this.dialog.open(AddNewFolderUserDialogComponent, {
      minWidth: '30vw',
      height: 'auto',
      data: data,
    });
  }

  activeFolder(folder: OcrNodeModel) {
    this.service.activeFolder(folder);
  }

  clickShowComponentOcr() {}

  clickOutsideListFolder(event: any) {}

  getisFullSreenComponent(isFullSeen: boolean) {
    this.isFullSreenComponent = isFullSeen;
  }
}

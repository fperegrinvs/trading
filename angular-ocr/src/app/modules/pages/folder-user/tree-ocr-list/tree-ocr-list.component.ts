import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewFolderUserDialogComponent } from '../add-new-folder-user-dialog/add-new-folder-user-dialog.component';
import { AddNewFileDialogComponent } from '../add-new-file-dialog/add-new-file-dialog.component';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { FolderUserStore } from '../services/folder-user-store.store';
import { OcrNodeModel } from '../models/ocr-node.model';

@Component({
  selector: 'app-tree-ocr-list',
  templateUrl: 'tree-ocr-list.component.html',
  styleUrls: ['./tree-ocr-list.component.scss'],
})
export class TreeOcrListComponent implements OnInit, OnDestroy {
  isFullSreenComponent: boolean = false;
  subjectDestroy = new Subject();

  constructor(
    public dialog: MatDialog,
    public serviceStore: FolderUserStore,
    public translate: TranslateService
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subjectDestroy.next();
    this.subjectDestroy.complete();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddNewFileDialogComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '80vw',
      maxHeight: '100vh',
    });
  }

  addNewFoler() {
    const dialogRef = this.dialog.open(AddNewFolderUserDialogComponent, {
      minWidth: '30vw',
      height: 'auto',
    });
  }

  clickShowComponentOcr() {}

  clickOutsideListFolder(event: any) {}

  getisFullSreenComponent(isFullSeen: boolean) {
    this.isFullSreenComponent = isFullSeen;
  }

  deleteFolder() {}

  move() {}

  rename() {}

  activeNode(ocrNode: OcrNodeModel) {
    this.serviceStore.activeOcrNode = ocrNode;
  }
}

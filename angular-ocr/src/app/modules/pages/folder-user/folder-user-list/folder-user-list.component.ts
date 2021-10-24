import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FolderOcrFileStateModel } from '../../ocr-main/models/ocr-file-state.model';
import { AddNewFolderUserDialogComponent } from '../add-new-folder-user-dialog/add-new-folder-user-dialog.component';
import { FolderUserService } from '../services/folder-user.service';
import { OcrNodeModel } from '../models/ocr-node.model';
import { AddNewFileDialogComponent } from '../add-new-file-dialog/add-new-file-dialog.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FileModel } from '../models/file.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-folder-user-list',
  templateUrl: 'folder-user-list.component.html',
  styleUrls: ['./folder-user-list.component.scss'],
})
export class FolderUserListComponent implements OnInit, OnDestroy {
  isFullSreenComponent: boolean = false;
  subjectDestroy = new Subject();
  private subjectFiles = new BehaviorSubject<FileModel[]>([]);
  files$: Observable<FileModel[]> = this.subjectFiles.asObservable();
  private subjectFoldes = new BehaviorSubject<OcrNodeModel[]>([]);
  folders$: Observable<OcrNodeModel[]> = this.subjectFoldes.asObservable();

  constructor(public dialog: MatDialog, public service: FolderUserService) {}

  ngOnInit() {
    this.service.lstOcrNodel$
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((res) => {
        this.initFilesFolders(res);
      });
  }

  initFilesFolders(lst: any[]) {
    const lstFile = lst.filter((item) => item.type !== 'folder');
    this.subjectFiles.next(lstFile);
    const lstFolder = lst.filter((item) => item.type === 'folder');
    this.subjectFoldes.next(lstFolder);
  }

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

  deleteFolder() {}

  move() {}

  rename() {}
}

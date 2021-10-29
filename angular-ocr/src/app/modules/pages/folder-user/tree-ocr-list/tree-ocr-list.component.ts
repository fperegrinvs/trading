import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewFolderUserDialogComponent } from '../add-new-folder-user-dialog/add-new-folder-user-dialog.component';
import { AddNewFileDialogComponent } from '../add-new-file-dialog/add-new-file-dialog.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { FolderUserStore } from '../services/folder-user-store.store';
import { OcrNodeModel } from '../models/ocr-node.model';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-tree-ocr-list',
  templateUrl: 'tree-ocr-list.component.html',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
  styleUrls: ['./tree-ocr-list.component.scss'],
})
export class TreeOcrListComponent implements OnInit, OnDestroy {
  isFullSreenComponent: boolean = false;
  subjectDestroy = new Subject();
  numberCol = 4;
  showComponentFile: boolean;
  rows: any = {};
  clickCountFile: number = 0;
  private readonly _isLoading = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this._isLoading.asObservable();

  constructor(
    public dialog: MatDialog,
    public serviceStore: FolderUserStore,
    public translate: TranslateService,
    public cd: ChangeDetectorRef
  ) {}

  get isLoading() {
    return this._isLoading.getValue();
  }

  set isLoading(val: boolean) {
    this._isLoading.next(val);
  }

  ngOnInit() {
    let index = 0;
    this.serviceStore.isLoading$
      .pipe(
        shareReplay(),
        takeUntil(this.subjectDestroy),
        tap((res) => {
          this.isLoading = res;
        })
      )
      .subscribe();

    this.serviceStore.props$
      .pipe(
        shareReplay(),
        takeUntil(this.subjectDestroy),
        tap((res) => {
          this.numberCol = 4 + res.length;
        })
      )
      .subscribe();
    this.numberCol = this.numberCol + this.serviceStore.props.length;
  }

  ngOnDestroy(): void {
    this.subjectDestroy.next();
    this.subjectDestroy.complete();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddNewFileDialogComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '50vw',
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

  getHeaderTitle(note: string): string {
    if (note.includes('(')) {
      return note.split('(')[0].trim();
    } else return note;
  }

  getBackgroundActive() {
    return 'active-color';
  }

  clickFile(ocr: OcrNodeModel) {
    this.clickCountFile++;
    this.activeNode(ocr);
    setTimeout(() => {
      if (this.clickCountFile === 2) {
        this.isFullSreenComponent = true;
      }
      this.clickCountFile = 0;
      this.cd.detectChanges();
    }, 250);
  }

  clickOutSide() {
    this.activeNode(this.serviceStore.ROOT_OcrNode);
  }
}

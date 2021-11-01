import {ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewFolderUserDialogComponent } from '../add-new-folder-user-dialog/add-new-folder-user-dialog.component';
import { AddNewFileDialogComponent } from '../add-new-file-dialog/add-new-file-dialog.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { FolderUserStore } from '../services/folder-user-store.store';
import { OcrNodeModel } from '../models/ocr-node.model';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';
import { DeleteDialogComponent } from '../../shares/delete-dialog/delete-dialog.component';
import { OcrTypeModel } from '../models/ocr-type.model';

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
  isOpenDialog = false;
  isFullScreenComponent: boolean;
  subjectDestroy = new Subject();
  numberCol = 4;
  rows: any = {};
  clickCountFile: number = 0;
  public lstDStypeOcr: OcrTypeModel[];

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
    this.lstDStypeOcr = this.serviceStore.ocrTypeModels;
    this.isFullScreenComponent = false;
    this.serviceStore.showComponentFile = false;
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
    this.isOpenDialog = true;
    const dialogRef = this.dialog.open(AddNewFileDialogComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '50vw',
      maxHeight: '100vh',
    });
    const sb = dialogRef.afterClosed().subscribe((res) => {
      this.isOpenDialog = false;
    });
  }

  addNewFoler() {
    this.isOpenDialog = true;
    const dialogRef = this.dialog.open(AddNewFolderUserDialogComponent, {
      minWidth: '30vw',
      height: 'auto',
    });
    const sb = dialogRef.afterClosed().subscribe((res) => {
      this.isOpenDialog = false;
    });
  }

  getisFullScreenComponent(isFullSeen: boolean) {
    this.isFullScreenComponent = isFullSeen;
  }

  delete() {
    this.isOpenDialog = true;
    const nameObject = this.serviceStore.activeOcrNode.name;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      minWidth: '30vw',
      height: 'auto',
      data: {
        nameObject: nameObject,
      },
    });

    const sb2 = dialogRef
      .afterClosed()
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((dataDialog) => {
        if (dataDialog) {
          this.serviceStore
            .deleteTreeOcr(this.serviceStore.activeOcrNode)
            .subscribe((res) => {
              if (res.isvalid && dataDialog.deleteAll) {
                this.serviceStore
                  .deleteTreeOcr(res.item)
                  .subscribe((res2) => {
                    if (!res2.isvalid) {
                      console.log('lỗi 2 lần', res2);
                    }
                  });
              }
            });
        }
        this.isOpenDialog = false;
      });
  }

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
        this.serviceStore.showComponentFile = true;
        this.serviceStore.focusFileId = ocr.id;
      }
      this.clickCountFile = 0;
      this.cd.detectChanges();
    }, 250);
  }

  clickOutSide() {
    if (!this.isOpenDialog && !this.serviceStore.showComponentFile) {
      this.activeNode(this.serviceStore.ROOT_OcrNode);
    }
  }

  updateTypeOcr(val: OcrTypeModel) {
    this.lstDStypeOcr.forEach((item) => {
      if (item.name === val.name) {
        item.isCheck = true;
      } else item.isCheck = false;
    });
    this.serviceStore.ocrTypeModels = this.lstDStypeOcr;
  }

  clickCloseComponentFile(event: boolean) {
    this.serviceStore.showComponentFile = false;
  }

  @HostListener('document:keydown.delete', ['$event'])
  onKeydownDeleteHandler(event: KeyboardEvent) {
    if (this.serviceStore.activeOcrNode.id !== undefined) {
      this.delete();
    }
  }
}

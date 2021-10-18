import { OcrMainService } from '../service/ocr-main.service';
import { OcrModel } from '../models/ocr-model';
import { Observable, Subscription } from 'rxjs';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { OcrMainEditOcrDialogComponent } from '../ocr-main-edit-ocr-dialog/ocr-main-edit-ocr-dialog.component';
import {
  FolderOcrFileStateModel,
  OcrFileStateModel,
} from '../models/ocr-file-state.model';
import { OcrMainAddfolderDialogComponent } from '../ocr-main-add-folder-dialog/ocr-main-add-folder-dialog.component';

@Component({
  selector: 'app-ocr-main-list-new',
  templateUrl: 'ocr-main-list-new.component.html',
  styleUrls: ['./ocr-main-list-new.component.scss'],
})
export class OcrMainListNewComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  data$: Observable<OcrModel[]> = this.service.lstOcrModel$;
  isLoading = false;
  isOpenShowComponentOcr: boolean;
  lengthMetadata: number = 5;
  lengthColTable: number = 9;

  fileClick: OcrFileStateModel;

  private subs: Subscription[] = [];

  constructor(public dialog: MatDialog, private service: OcrMainService) {}

  ngOnInit() {
    this.init();
    this.data$.subscribe((res) => {
      console.log('resssssssss', res);
    });
    this.service.showComponentProgressFile.subscribe((res) => {
      this.isOpenShowComponentOcr = res;
    });
    this.service.fileActive$.subscribe((res) => {
      this.fileClick = res;
    });
  }

  init() {
    this.isLoading = true;
    this.service.getLstOcrModel();

    const sb = this.data$.subscribe((model: OcrModel[]) => {
      this.isLoading = false;
    });

    this.subs.push(sb);
  }

  ngOnDestroy(): void {
    this.subs.forEach((item) => item.unsubscribe());
  }

  ngAfterViewInit(): void {}

  addNew() {
    const dialogRef = this.dialog.open(OcrMainEditOcrDialogComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '80vw',
      maxHeight: '100vh',
    });
  }

  addNewFoler() {
    const data = new FolderOcrFileStateModel();
    const dialogRef = this.dialog.open(OcrMainAddfolderDialogComponent, {
      minWidth: '30vw',
      height: 'auto',
      data: data,
    });
  }

  activeOcrModel(ocr: OcrModel) {
    this.service.activeOcrModel(ocr);
  }

  clickShowComponentOcr() {
    this.isOpenShowComponentOcr = !this.isOpenShowComponentOcr;
    if (this.isOpenShowComponentOcr) {
      this.service.openShowComponentProgressFile();
    } else {
      this.service.closeShowComponentProgressFile();
    }
  }

  clickOutsideListFolder(event: any) {
    this.service.activeRootFolder();
  }
}

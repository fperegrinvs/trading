import { OcrMainService } from '../service/ocr-main.service';
import { OcrModel } from '../models/ocr-model';
import { Observable, Subscription } from 'rxjs';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { OcrMainEditOcrDialogComponent } from '../ocr-main-edit-ocr-dialog/ocr-main-edit-ocr-dialog.component';
import { FolderOcrFileStateModel } from '../models/ocr-file-state.model';
import { OcrMainAddfolderDialogComponent } from '../ocr-main-add-folder-dialog/ocr-main-add-folder-dialog.component';

@Component({
  selector: 'app-ocr-main-list-new',
  templateUrl: 'ocr-main-list-new.component.html',
  styleUrls: ['./ocr-main-list-new.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'void',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OcrMainListNewComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  data$: Observable<OcrModel[]> = this.service.lstOcrModel$;
  isLoading = false;

  lengthMetadata: number = 5;
  lengthColTable: number = 9;
  private subs: Subscription[] = [];

  constructor(public dialog: MatDialog, private service: OcrMainService) {}

  ngOnInit() {
    this.init();
    this.data$.subscribe((res) => {
      console.log('resssssssss', res);
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
}

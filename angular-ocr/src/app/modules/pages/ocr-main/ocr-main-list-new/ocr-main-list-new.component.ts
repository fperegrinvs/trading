import { OcrMainService } from '../service/ocr-main.service';
import { OcrModel } from '../models/ocr-model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { OcrMainEditOcrDialogComponent } from '../ocr-main-edit-ocr-dialog/ocr-main-edit-ocr-dialog.component';
import { FolderOcrFileStateModel, OcrFileStateModel } from '../models/ocr-file-state.model';

@Component({
  selector: 'app-ocr-main-list-new',
  templateUrl: 'ocr-main-list-new.component.html',
  styleUrls: ['./ocr-main-list-new.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OcrMainListNewComponent implements OnInit, AfterViewInit, OnDestroy {
  data$: Observable<OcrModel[]> = this.service.lstOcrModel$;
  isLoading = false;
  private subs: Subscription[] = [];

  displayedColumns: string[] = [
    'drag',
    'name',
    'trangthai',
    'nguoitao',
    'ngaytao',
    'loaivanban',
    'coquanbanhanh',
    'ngaybanhanh',
    'sovanban',
    'nguoiky',
  ];

  dataSource = this.data$;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private service: OcrMainService) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.isLoading = true;
    this.service.getLstOcrModel();

    const sb = this.data$.subscribe((lst: OcrModel[]) => {
      this.isLoading = false;
    });

    this.subs.push(sb);
  }

  ngOnDestroy(): void {
    this.subs.forEach((item) => item.unsubscribe());
  }

  ngAfterViewInit(): void {}

  isExpansionDetailRow = (index: any, row: any) => row.hasOwnProperty('detailRow');

  getNameFile(fileName: string): string {
    const words = fileName.split('/');
    return words[words.length - 1];
  }

  getStateOCR(model: OcrModel): string {
    let index = 0;
    model.files.forEach((file) => {
      if (file.isRecogniting) {
        index = index + 1;
      }
    });
    model.folders.forEach((folder) => {
      index = this.getIndexOcr(index, folder);
    });

    if (index != 0) {
      return 'Đang nhận dạng ' + index + ' tập tin';
    }
    return '';
  }

  getIndexOcr(index: number, folderOcrFileStateModel: FolderOcrFileStateModel): number {
    folderOcrFileStateModel.files.forEach((file) => {
      if (file.isRecogniting) index = index + 1;
    });
    index = this.getIndexOcr(index, folderOcrFileStateModel);
    return index;
  }

  getStateExtract(model: OcrModel): string {
    let index = 0;
    model.files.forEach((file) => {
      if (file.isRecogniting) {
        index = index + 1;
      }
    });
    model.folders.forEach((folder) => {
      index = this.getIndexExtract(index, folder);
    });

    if (index != 0) {
      return 'Đang trích xuất ' + index + ' tập tin';
    }
    return '';
  }

  getIndexExtract(index: number, folderOcrFileStateModel: FolderOcrFileStateModel): number {
    folderOcrFileStateModel.files.forEach((file) => {
      if (file.isExtractingMetadata) index = index + 1;
    });
    index = this.getIndexExtract(index, folderOcrFileStateModel);
    return index;
  }

  selectedRowIndex: any = '';
  isActive(index: any) {
    this.selectedRowIndex = index.name;
  }

  addNew() {
    const dialogRef = this.dialog.open(OcrMainEditOcrDialogComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '80vw',
      maxHeight: '100vh',
    });
  }
}

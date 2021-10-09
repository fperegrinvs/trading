import { OcrMainService } from './../service/ocr-main.service';
import { OcrModel } from '../models/ocr-model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { OcrMainEditOcrDialogComponent } from '../ocr-main-edit-ocr-dialog/ocr-main-edit-ocr-dialog.component';

@Component({
  selector: 'app-ocr-main-list',
  templateUrl: 'ocr-main-list.component.html',
  styleUrls: ['./ocr-main-list-component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OcrMainListComponent implements OnInit, AfterViewInit, OnDestroy {
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
  getStateOCR(model: OcrModel) {
    return 'Đang nhận dạng';
  }

  getStateExtract(model: OcrModel) {
    return 'Đang trích xuất metadata';
  }

  isOCR(model: OcrModel) {
    let res = false;
    // model.files.forEach((element) => {
    //   if (element.progressOcr.pending) {
    //     res = true;
    //     return res;
    //   }
    // });
    return res;
  }

  isExtract(model: OcrModel) {
    let res = false;
    // model.files.forEach((element) => {
    //   if (element.progressExtract.pending) {
    //     res = true;
    //     return res;
    //   }
    // });
    return res;
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

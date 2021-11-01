import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {OcrNodeModel} from '../../../models/ocr-node.model';
import {FolderUserStore} from "../../../services/folder-user-store.store";

@Component({
  selector: 'ocr-file-page',
  templateUrl: 'ocr-file-page.component.html',
  styleUrls: ['ocr-file-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OcrFilePageComponent implements OnInit, OnChanges {
  @Output('currentPage')
  currentPageEvent: EventEmitter<number> = new EventEmitter<number>();

  @Input('page_count')
  page_count: number;

  lstCountPages: number[] = [];
  currentPage: number = 1;

  constructor(public cd: ChangeDetectorRef, public serviceStore: FolderUserStore) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.page_count) {
      this.ngOnInit();
    }
  }

  ngOnInit() {
    this.lstCountPages = [...Array(this.page_count + 1).keys()].slice(1);
    this.cd.detectChanges();
  }

  clickPage(page: number) {
    this.currentPage = page;
    this.currentPageEvent.emit(this.currentPage);
  }

  previousPage() {
    const previou = this.currentPage - 1;
    if (previou > 0) this.clickPage(previou);
  }

  nextPage() {
    const next = this.currentPage + 1;
    if (next <= this.page_count) this.clickPage(next);
  }
}

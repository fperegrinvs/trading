import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FileModel } from '../../../models/file.model';

@Component({
  selector: 'ocr-file-page',
  templateUrl: 'ocr-file-page.component.html',
  styleUrls: ['ocr-file-page.component.scss'],
})
export class OcrFilePageComponent implements OnInit, OnChanges {
  @Output('currentPage')
  currentPageEvent: EventEmitter<number> = new EventEmitter<number>();

  @Input('file')
  file: FileModel;

  lstCountPages: number[] = [];
  currentPage: number = 1;

  constructor(public cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.files) {
      this.cd.detectChanges();
    }
  }

  ngOnInit() {
    this.lstCountPages = [...Array(this.file.page_count + 1).keys()].slice(1);
  }

  clickPage(page: number) {
    this.currentPage = page;
    this.currentPageEvent.emit(this.currentPage);
  }

  previouPage() {
    const previou = this.currentPage - 1;
    if (previou > 0) this.clickPage(previou);
  }

  nextPage() {
    const next = this.currentPage + 1;
    if (next <= this.file.page_count) this.clickPage(next);
  }
}

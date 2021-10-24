import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { OcrFileModel } from '../../../models/ocr-file.model';

@Component({
  selector: 'ocr-table-metadata, [ocr-table-metadata]',
  templateUrl: 'ocr-table-metadata.component.html',
  styleUrls: ['ocr-table-metadata.component.scss'],
})
export class OcrTableMetadataComponent implements OnInit, OnChanges {
  @Input('ocrFileModel')
  ocrFile: OcrFileModel;

  constructor(public cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.file) this.cd.detectChanges();
  }

  ngOnInit() {}
}

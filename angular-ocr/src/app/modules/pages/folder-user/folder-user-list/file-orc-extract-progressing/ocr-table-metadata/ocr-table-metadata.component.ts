import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { OcrNodeModel } from '../../../models/ocr-node.model';
import { FolderUserStore } from '../../../services/folder-user-store.store';

@Component({
  selector: 'ocr-table-metadata, [ocr-table-metadata]',
  templateUrl: 'ocr-table-metadata.component.html',
  styleUrls: ['ocr-table-metadata.component.scss'],
})
export class OcrTableMetadataComponent implements OnInit, OnChanges {
  @Input('OcrNodeModel')
  ocrFile: OcrNodeModel;

  constructor(
    public cd: ChangeDetectorRef,
    public serviceStore: FolderUserStore
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.file) this.cd.detectChanges();
  }

  ngOnInit() {}

  getHeaderTitle(note: string): string {
    if (note.includes('(')) {
      return note.split('(')[0].trim();
    } else return note;
  }
}

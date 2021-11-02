import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NgZone, ViewChild } from '@angular/core';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { take } from 'rxjs/internal/operators/take';
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
    public serviceStore: FolderUserStore,
    private _ngZone: NgZone
  ) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ocrFile) this.cd.detectChanges();
  }

  ngOnInit() {}

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.autosize.resizeToFitContent(true);
      this.cd.detectChanges();
    });
  }

  getHeaderTitle(note: string): string {
    if (note.includes('(')) {
      return note.split('(')[0].trim();
    } else return note;
  }
}

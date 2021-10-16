import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OcrMainService } from '../../service/ocr-main.service';
import { OcrFileStateModel } from '../../models/ocr-file-state.model';

@Component({
  selector: 'table-ocr-file, [table-ocr-file]',
  templateUrl: 'ocr-file.component.html',
  styleUrls: ['./ocr-file.component.scss'],
})
export class OcrFileComponent implements OnInit {
  @Input('lengthColTable')
  lengthColTable?: number = 9;

  @Input('files')
  files?: OcrFileStateModel[];

  constructor(public service: OcrMainService) {}

  ngOnInit() {}

  getNameFile(fileName: string): string {
    const words = fileName.split('/');
    return words[words.length - 1];
  }
}

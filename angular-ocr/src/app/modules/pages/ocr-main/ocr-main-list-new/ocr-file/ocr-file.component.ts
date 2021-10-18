import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { OcrMainService } from '../../service/ocr-main.service';
import { OcrFileStateModel } from '../../models/ocr-file-state.model';
import { tap } from 'rxjs/operators';

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

  constructor(public service: OcrMainService, public cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.service.fileActive$
      .pipe(tap((res) => this.cd.detectChanges()))
      .subscribe();
  }

  clickFile(file: OcrFileStateModel) {
    this.service.activeFile(file);
    this.service.openShowComponentProgressFile();
    console.log('file click', file);
  }

  roudPercent(percent: number) {
    return Math.round(percent);
  }
}

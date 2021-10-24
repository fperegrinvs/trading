import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FolderUserService } from '../../../services/folder-user.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { OcrFileProgressingModel } from '../../../models/ocr-file-progressing.model';

@Component({
  selector: 'ocr-progressing',
  templateUrl: 'ocr-progressing.component.html',
})
export class OcrProgressingComponent implements OnInit, OnDestroy {
  @Input('fileId')
  fileId: string;
  color: string = 'primary';
  private subjectDestroy = new Subject();
  private ocrFileProgressSubject = new BehaviorSubject<OcrFileProgressingModel>(
    null
  );

  public ocrFileProgress$ = this.ocrFileProgressSubject.asObservable();

  constructor(public service: FolderUserService) {}

  ngOnDestroy(): void {
    this.subjectDestroy.next();
    this.subjectDestroy.complete();
  }

  ngOnInit() {
    this.service.lstOcrFileProgress$
      .pipe(takeUntil(this.subjectDestroy), shareReplay())
      .subscribe((res) =>
        res.forEach((item) => {
          if (item.fileId === this.fileId) {
            this.ocrFileProgressSubject.next(item);
            if (item.done) {
              this.ocrFileProgressSubject.next(null);
              this.ngOnDestroy();
            }
          }
        })
      );

    this.service.loadOcrFileProgressById(this.fileId);
  }
}

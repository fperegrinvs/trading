import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FolderUserService } from '../../../services/folder-user.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((res) =>
        res.forEach((item) => {
          if (item.fileId === this.fileId) {
            this.ocrFileProgressSubject.next(item);
          }
          if (item.done) this.ocrFileProgressSubject.next(null);
        })
      );

    this.service.loadOcrFileProgressById(this.fileId);
  }
}

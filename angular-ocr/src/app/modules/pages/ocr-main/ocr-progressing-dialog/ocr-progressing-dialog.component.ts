import { EState, OcrTask } from '../models/ocr-task.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { OcrFileStateModel } from '../models/ocr-file-state.model';
import { OcrMainService } from '../service/ocr-main.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ocr-progressing, [ocr-progressing]',
  templateUrl: 'ocr-progressing-dialog.component.html',
  styleUrls: ['./ocr-progressing-dialog.component.scss'],
})
export class OcrProgressingDialogComponent implements OnInit, OnDestroy {
  file: OcrFileStateModel;
  ocrtext: string;
  isPdf: boolean;
  showBtnExtract: boolean = false;
  subjectDestroy = new Subject();

  constructor(public service: OcrMainService, public cd: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.subjectDestroy.next();
    this.subjectDestroy.complete();
  }

  ngOnInit() {
    this.service.fileActive$
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((res) => {
        this.file = res;
        this.ocrtext = res.dataRecognition;
        console.log('ki vay ta');
        this.cd.detectChanges();
      });

    this.checkIsPdf(this.file.name);
  }

  checkIsPdf(filename: string) {
    if (filename.split('.')[1].toLowerCase() == 'pdf') {
      this.isPdf = true;
    } else {
      this.isPdf = false;
    }
  }

  nhanDang() {
    this.service
      .ocrTransformer(this.file.documentFileRawUrlId)
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((res) => {
        this.file.isRecognition = true;
        this.file.taskId = res.task_id;
        console.log('taskid: ', res.task_id);
        const time = timer(0, 1000);
        const sb = time
          .pipe(takeUntil(this.subjectDestroy))
          .subscribe((val) => {
            console.log('timer', val);
            this.service
              .getTaskOCR(res.task_id)
              .pipe(takeUntil(this.subjectDestroy))
              .subscribe(
                (res: OcrTask) => {
                  console.log('---------------OcrTask----------------', res);
                  console.log(
                    'this.file.progressRecognition',
                    this.file.progressRecognition
                  );
                  this.file.progressRecognition.state = res.state;
                  this.file.progressRecognition.result = res.result;
                  this.service.activeFile(this.file);
                  if (res.state == EState.success) {
                    this.ocrtext = res.result.data;
                    this.file.dataRecognition = res.result.data;
                    this.file.isRecognition = false;
                    this.file.completeRecognition = true;
                    this.service.activeFile(this.file);
                    this.showBtnExtract = true;
                    sb.unsubscribe();
                  } else if (res.state == EState.failure) {
                    sb.unsubscribe();
                  }
                },
                (error: any) => {
                  console.log(error);
                  sb.unsubscribe();
                },
                () => {
                  this.cd.detectChanges();
                }
              );
          });
      });
  }

  trichXuatMetadata() {
    this.service.extractMetadata(this.ocrtext).subscribe((res) => {
      console.log('extractMetadata', res);
    });
  }

  Dong() {
    this.service.closeShowComponentProgressFile();
  }
}

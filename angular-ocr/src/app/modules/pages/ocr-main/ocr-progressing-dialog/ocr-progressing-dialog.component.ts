import { EState, OcrTask } from '../models/ocr-task.model';
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { OcrFileStateModel } from '../models/ocr-file-state.model';
import { OcrMainService } from '../service/ocr-main.service';

@Component({
  selector: 'ocr-progressing, [ocr-progressing]',
  templateUrl: 'ocr-progressing-dialog.component.html',
  styleUrls: ['./ocr-progressing-dialog.component.scss'],
})
export class OcrProgressingDialogComponent implements OnInit {
  file: OcrFileStateModel;
  ocrtext: string;
  isPdf: boolean;
  imagePreview: string;
  taskid: string;
  subjectOCR = new BehaviorSubject<string>('');
  progressOCR = new BehaviorSubject<number>(0);
  state: EState;
  showBtnExtract: boolean = false;

  constructor(public service: OcrMainService, public cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.service.fileActive$.subscribe((res) => {
      this.file = res;
      console.log('file click', this.file);
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
      .subscribe((res) => {
        this.taskid = res.task_id;
        console.log('taskid xxxxxxxxxx', res.task_id);
        const time = timer(0, 2000);
        const sb = time.subscribe((val) => {
          console.log('==============', val);
          this.service.getTaskOCR(this.taskid).subscribe(
            (res: OcrTask) => {
              this.state = res.state;
              this.service.subjectEState.next(this.state);
              this.progressOCR.next(res.result.percent);
              this.service.subjectPercentOcr.next(res.result.percent);
              if (res.state == EState.success) {
                this.ocrtext = res.result.data;
                this.showBtnExtract = true;
                sb.unsubscribe();
              } else if (res.state == EState.failure) {
                sb.unsubscribe();
              }
            },
            (error: any) => {
              console.log(error);
              sb.unsubscribe();
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

import { EState, OcrTask } from '../models/ocr-task.model';
import { OcrMainService } from './../service/ocr-main.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { timer } from 'rxjs';

@Component({
  selector: 'ocr-progressing',
  templateUrl: 'ocr-progressing-dialog.component.html',
  styleUrls: ['./ocr-progressing-dialog.component.scss'],
})
export class OcrProgressingDialogComponent implements OnInit {
  @Input('file') file?: File;
  ocrtext: string;
  isPdf: boolean;
  imagePreview: string;
  taskid: string;
  subjectOCR = new BehaviorSubject<string>('');
  progressOCR = new BehaviorSubject<number>(0);
  state: EState;
  showBtnExtract: boolean = false;
  constructor(public dialogRef: MatDialogRef<OcrProgressingDialogComponent>, public service: OcrMainService) {}

  ngOnInit() {
    if (this.file) {
      this.checkIsPdf(this.file.name);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  checkIsPdf(filename: string) {
    if (filename.split('.')[1].toLowerCase() == 'pdf') {
      this.isPdf = true;
    } else {
      this.isPdf = false;
    }
  }

  nhanDang() {
    this.service.transformer(this.file).subscribe((res) => {
      this.taskid = res.task_id;
      console.log('taskid xxxxxxxxxx', res.task_id);
      setTimeout(() => {
        const time = timer(0, 2000);
        const sb = time.subscribe((val) => {
          console.log('==============', val);
          this.service.getTaskOCR(this.taskid).subscribe(
            (res: OcrTask) => {
              this.state = res.state;
              this.progressOCR.next(res.result.percent);
              console.log('OcrTask', res);
              console.log('progress', res.result.percent);
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
      }, 5000);
    });
  }

  trichXuatMetadata() {
    this.service.extractMetadata(this.ocrtext).subscribe((res) => {
      console.log('extractMetadata', res);
    });
  }
}

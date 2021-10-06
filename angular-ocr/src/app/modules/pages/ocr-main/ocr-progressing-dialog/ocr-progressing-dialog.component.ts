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
      console.log('taskid==========', res.task_id);
      const time = timer(100, 2000);
      const sb = time.subscribe((val) => {
        console.log('==============', val);
        this.service.getTaskOCR(this.taskid).subscribe(
          (res: OcrTask) => {
            this.state = res.state;
            this.progressOCR.next(res.progress.current);
            console.log('=-=-=-=-=', res);
            console.log('progress', res.progress.percent);
            if (res.complete) {
              this.ocrtext = res.result.data[0];
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
}

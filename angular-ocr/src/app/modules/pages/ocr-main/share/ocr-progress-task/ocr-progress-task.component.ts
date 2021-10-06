import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EState, OcrTask } from '../../models/ocr-task.model';

@Component({
  selector: 'ocr-progress-task',
  templateUrl: 'ocr-progress-task.component.html',
  styleUrls: ['ocr-progress-task.component.scss'],
})
export class OcrProgressTask implements OnInit, OnChanges {
  //subject = new BehaviorSubject<number>(0);
  //percentage$ = this.subject.asObservable();
  @Input('ocrTask')
  ocrTask: OcrTask;

  color: string = 'primary';
  isPause: boolean = false;
  clickNhanDang: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ocrTask.currentValue) {
    }
  }
  ngOnInit() {}
  clickPause() {}
  clickPlay() {}

  // getState(): string {
  //   switch (this.state) {
  //     case EState.success:
  //       this.color = 'warm';
  //       return 'Nhận dạng kí tự thành công!';
  //     case EState.progress:
  //       return 'Đang nhận dạng kí tự...';
  //     case EState.pending:
  //       return 'Chờ xử lý ...';
  //     case EState.failure:
  //       this.color = 'accent';
  //       return 'Nhận dạng thất bại.';
  //     default:
  //       return '';
  //   }
  // }
}

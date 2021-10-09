import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EState, OcrTask } from '../../models/ocr-task.model';

@Component({
  selector: 'ocr-progress-task',
  templateUrl: 'ocr-progress-task.component.html',
  styleUrls: ['ocr-progress-task.component.scss'],
})
export class OcrProgressTask implements OnInit, OnChanges {
  subject = new BehaviorSubject<number>(0);
  percentage$ = this.subject.asObservable();
  // @Input('ocrTask')
  // ocrTask: OcrTask;
  @Input('state')
  state: any;
  @Input('percentage')
  percentage: number;

  color: string = 'primary';
  isPause: boolean = false;
  clickNhanDang: boolean = false;

  constructor(public cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.state) {
      console.log('change.state', this.state);
    }
  }
  ngOnInit() {}
  clickPause() {}
  clickPlay() {}

  getState(): string {
    switch (this.state) {
      case EState.success:
        return 'Nhận dạng kí tự thành công!';
      case EState.progress:
        return 'Đang nhận dạng kí tự...';
      case EState.pending:
        return 'Chờ xử lý ...';
      case EState.failure:
        return 'Nhận dạng thất bại.';
      default:
        return '';
    }
  }
}

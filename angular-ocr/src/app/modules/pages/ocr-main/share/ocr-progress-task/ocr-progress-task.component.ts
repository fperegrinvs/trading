import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EState, OcrTask } from '../../models/ocr-task.model';
import { OcrMainService } from '../../service/ocr-main.service';

@Component({
  selector: 'ocr-progress-task',
  templateUrl: 'ocr-progress-task.component.html',
  styleUrls: ['ocr-progress-task.component.scss'],
})
export class OcrProgressTask implements OnInit {
  state: EState;

  percentage: number;

  color: string = 'primary';
  isPause: boolean = false;
  clickNhanDang: boolean = false;

  constructor(public cd: ChangeDetectorRef, public service: OcrMainService) {}

  ngOnInit() {
    this.service.activeEState$.subscribe((res) => {
      this.state = res;
      this.cd.detectChanges();
    });

    this.service.percentOcr$.subscribe((res) => {
      this.percentage = res;
      this.cd.detectChanges();
    });
  }

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

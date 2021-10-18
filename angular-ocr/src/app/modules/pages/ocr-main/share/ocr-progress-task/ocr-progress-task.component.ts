import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EState } from '../../models/ocr-task.model';
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

  constructor(public cd: ChangeDetectorRef, public service: OcrMainService) {}

  ngOnInit() {
    this.service.fileActive$.subscribe((file) => {
      this.state = file.progressRecognition.state;
      this.percentage = file.progressRecognition.result.percent;
      this.cd.detectChanges();
      console.log('ki vay ta 2');
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

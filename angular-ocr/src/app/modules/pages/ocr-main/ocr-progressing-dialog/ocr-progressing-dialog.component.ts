import { EState, OcrTask } from '../models/ocr-task.model';
import { Subject } from 'rxjs';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { timer } from 'rxjs';
import { OcrFileStateModel } from '../models/ocr-file-state.model';
import { OcrMainService } from '../service/ocr-main.service';
import { takeUntil } from 'rxjs/operators';
import { CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ocr-progressing, [ocr-progressing]',
  templateUrl: 'ocr-progressing-dialog.component.html',
  styleUrls: ['./ocr-progressing-dialog.component.scss'],
})
export class OcrProgressingDialogComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  file: OcrFileStateModel;
  ocrtext: string;
  isPdf: boolean;
  showBtnExtract: boolean = false;
  subjectDestroy = new Subject();
  isFullSreen: boolean = false;
  ocrModelId: string;
  folderParrentId: string;
  heightImg: string = '200px';
  widthImg: string = '500px';
  @Output('isFullSreen') eventFullSreen = new EventEmitter(false);
  @ViewChild('imgBox') imgBox: ElementRef;
  @ViewChild('dragHover') dragHover: ElementRef;
  @ViewChild('textareaEle') textareaEle: ElementRef;

  constructor(
    public service: OcrMainService,
    public cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  get imgBoxElement(): HTMLElement {
    return this.imgBox.nativeElement;
  }

  get draghoverCornerElement(): HTMLElement {
    return this.dragHover.nativeElement;
  }

  get textareaElement(): HTMLElement {
    return this.textareaEle.nativeElement;
  }

  ngAfterViewInit() {}

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
        this.cd.detectChanges();
        const sb = this.service.ocrModelActive$.subscribe((res) => {
          if (res._id) this.ocrModelId = res._id;
          console.log(this.ocrModelId, 'ocrModelId');
          setTimeout(() => {
            sb.unsubscribe();
          }, 500);
        });

        const sb2 = this.service.folderActive$.subscribe((res) => {
          if (res._id) this.folderParrentId = res._id;
          console.log(this.folderParrentId, 'folderParrentId');
          setTimeout(() => {
            sb2.unsubscribe();
          }, 500);
        });
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
                    this.file.dataRecognition = res.result.data[0];
                    this.file.isRecognition = false;
                    this.file.completeRecognition = true;
                    this.service.activeFile(this.file);
                    this.showBtnExtract = true;
                    this.service.findFileAndSaveOcrModel(
                      this.file,
                      this.folderParrentId,
                      this.ocrModelId
                    );
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

  ClickFullSreen() {
    this.isFullSreen = !this.isFullSreen;
    this.eventFullSreen.emit(this.isFullSreen);
  }

  dragMove(dragHandle: HTMLElement, $event: CdkDragMove<any>) {
    this.ngZone.runOutsideAngular(() => {
      this.resize(dragHandle, this.imgBoxElement);
    });
  }

  resize(dragHandle: HTMLElement, target: HTMLElement) {
    const dragRect = dragHandle.getBoundingClientRect();

    console.log('dragRect', dragRect.left);

    const targetRect = target.getBoundingClientRect();
    console.log('targetRect', targetRect.left);

    const width = dragRect.left - targetRect.left + dragRect.width;
    console.log('width', width);
    //const height = dragRect.top - targetRect.top + dragRect.height;

    target.style.width = width + 'px';
    //target.style.height = height + 'px';
  }
}

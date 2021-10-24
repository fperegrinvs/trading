import {
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
import { FolderUserService } from '../../services/folder-user.service';
import { FileModel } from '../../models/file.model';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { OcrFileModel } from '../../models/ocr-file.model';

@Component({
  selector:
    'app-file-orc-extract-progressing, [app-file-orc-extract-progressing]',
  templateUrl: 'file-orc-extract-progressing.component.html',
  styleUrls: ['/file-orc-extract-progressing.component.scss'],
})
export class FileOrcExtractProgressingComponent implements OnInit, OnDestroy {
  isFullSreen: boolean = false;
  showBtnExtract: boolean = false;

  file: FileModel;
  ocrtext: string;
  page: number;
  subjectDestroy = new Subject();
  numberCol: number;
  isShowImg: boolean;
  isShowOcrtext: boolean;
  isShowMetadata: boolean;
  ocr: OcrFileModel;

  @Output('isFullSreen') eventFullSreen = new EventEmitter(false);
  @ViewChild('imgBox') imgBox: ElementRef;
  @ViewChild('dragHover') dragHover: ElementRef;
  @ViewChild('textareaEle') textareaEle: ElementRef;

  imageToShow: any;
  isImageLoading = new BehaviorSubject<boolean>(true);

  loadingFirstTimeSubject = new BehaviorSubject<boolean>(true);

  public loadingFirstTime$ = this.loadingFirstTimeSubject.asObservable();

  constructor(
    public service: FolderUserService,
    private ngZone: NgZone,
    public cd: ChangeDetectorRef
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

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
        this.cd.detectChanges();
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  ngOnDestroy(): void {
    this.subjectDestroy.next();
    this.subjectDestroy.complete();
  }

  ngOnInit() {
    this.service.activeFile$.pipe(takeUntil(this.subjectDestroy)).subscribe(
      (file) => {
        this.loadingFirstTimeSubject.next(true);
        this.page = 1;
        this.service.getInfoFileById(file.id).subscribe((res) => {
          this.file = res.item;
          this.initOcrFile(res);
          this.initFirstGiaoDien(res.item);
          this.initFileRawUrl(file.id);
          this.loadingFirstTimeSubject.next(false);
        });
      },
      (error) => {
        console.log(error);
        this.loadingFirstTimeSubject.next(false);
      },
      () => this.loadingFirstTimeSubject.next(false)
    );

    this.service.lstOcrFileProgress$
      .pipe(takeUntil(this.subjectDestroy), shareReplay())
      .subscribe((res) =>
        res.forEach((item) => {
          if (item.fileId === this.file.id) {
            if (item.done) {
              this.service.getInfoFileById(this.file.id).subscribe((res) => {
                this.file = res.item;
                if (res.ocr.error) {
                  alert(res.ocr.error);
                }
                this.initOcrFile(res);
              });
            }
          }
        })
      );
  }

  initFirstGiaoDien(file: FileModel) {
    if (file.state === -1) {
      this.numberCol = 3;
      this.isShowImg = true;
      this.isShowOcrtext = true;
      this.isShowMetadata = true;
    } else {
      this.numberCol = 1;
      this.isShowImg = true;
      this.isShowOcrtext = false;
      this.isShowMetadata = false;
    }
    this.cd.detectChanges();
  }

  initFileRawUrl(fileId: string) {
    if (this.file.page_count < this.page) this.page = 1;
    this.service.getFileRawUrl(fileId, this.page).subscribe(
      (data) => {
        this.createImageFromBlob(data);
        this.isImageLoading.next(false);
      },
      (error) => {
        this.isImageLoading.next(false);
        console.log(error);
      }
    );
  }

  initOcrFile(res: { isvalid: boolean; item: FileModel; ocr: any }) {
    if (res.item.state === -1) {
      this.ocr = res.ocr;
      if (this.page - 1 > 0 && this.ocr.pages.length >= this.page) {
        this.ocrtext = this.ocr.pages[this.page - 1];
      } else {
        this.ocrtext = this.ocr.pages[0];
      }
      this.numberCol = 3;
      this.isShowImg = true;
      this.isShowOcrtext = true;
      this.isShowMetadata = true;
      this.cd.detectChanges();
    }
  }

  Dong() {
    this.service.closeShowComponentProgressFile();
  }

  ClickFullSreen() {
    this.isFullSreen = !this.isFullSreen;
    this.eventFullSreen.emit(this.isFullSreen);
  }

  nhanDang() {
    this.service
      .getInfoFileById(this.file.id)
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((res) => {
        let isForce: boolean = false;
        if (res.item.state === -1) {
          isForce = true;
        }
        this.service
          .nhanDang(this.file.id, isForce)
          .pipe(takeUntil(this.subjectDestroy))
          .subscribe(
            (res) => {
              this.file = res.item;
              this.initOcrFile(res);
              this.service.loadOcrFileProgressById(this.file.id);
            },
            (error) => {
              console.log(error);
            }
          );
      });
  }

  trichXuatMetadata() {}

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

  downloadFile() {
    this.service
      .download(this.file.id)
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((data) => {
        const url = window.URL.createObjectURL(data);
        window.open(url);
      });
  }

  closeShowImg() {
    this.isShowImg = false;
    this.numberCol = this.numberCol - 1;
  }

  closeShowOcrText() {
    this.isShowOcrtext = false;
    this.numberCol = this.numberCol - 1;
  }

  showMetadata() {
    this.isShowMetadata = true;
    this.numberCol = this.numberCol + 1;
  }

  showOcrText() {
    this.isShowOcrtext = true;
    this.numberCol = this.numberCol + 1;
  }

  showImg() {
    this.isShowImg = true;
    this.numberCol = this.numberCol + 1;
  }

  closeMetadta() {
    this.isShowMetadata = false;
    this.numberCol = this.numberCol - 1;
  }

  getCurrentPage(event: number) {
    this.page = event;
    if (
      this.page - 1 > 0 &&
      this.file.state === -1 &&
      this.ocr.pages.length >= this.page
    ) {
      this.ocrtext = this.ocr.pages[this.page - 1];
    }
    this.initFileRawUrl(this.file.id);
    this.cd.detectChanges();
  }
}

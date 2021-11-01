import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { take, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { OcrNodeModel } from '../../models/ocr-node.model';
import { FolderUserStore } from '../../services/folder-user-store.store';

@Component({
  selector: 'app-ocr-file-info, [app-ocr-file-info]',
  templateUrl: 'ocr-file-info.component.html',
  styleUrls: ['ocr-file-info.component.scss'],
})
export class OcrFileInfoComponent implements OnInit, OnDestroy {
  isFullScreen: boolean = false;
  showBtnExtract: boolean = false;

  fileId: string;
  lstOcrText: string[];
  page: number;
  subjectDestroy = new Subject();
  numberCol: number;
  isShowImg: boolean;
  isShowOcrtext: boolean;
  isShowMetadata: boolean;
  showNhanDang: boolean;
  ocrNode$: Observable<OcrNodeModel>;

  @Output('isFullScreen') eventFullSreen = new EventEmitter(false);
  @Output('closeComponentFile') eventCloseComponentFile = new EventEmitter(
    false
  );

  @ViewChild('imgBox') imgBox: ElementRef;
  @ViewChild('dragHover') dragHover: ElementRef;
  @ViewChild('textareaEle') textareaEle: ElementRef;

  imageToShow: any;
  isImageLoading = new BehaviorSubject<boolean>(true);
  loadingFirstTimeSubject = new BehaviorSubject<boolean>(true);
  public loadingFirstTime$ = this.loadingFirstTimeSubject.asObservable();
  pageOcr: any;

  constructor(
    public serviceStore: FolderUserStore,
    private ngZone: NgZone,
    public cd: ChangeDetectorRef
  ) {}

  set loadingFirstTime(val: boolean) {
    this.loadingFirstTimeSubject.next(val);
  }

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
    this.serviceStore.focusFileId$
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((res) => {
        if (res !== null && res !== undefined) {
          this.loadingFirstTime = true;
          this.fileId = res;
          this.ocrNode$ = this.serviceStore.getOcrNodeById(res);
          this.showNhanDang = true;
          this.lstOcrText = [];
          setTimeout(() => {
            this.initFileRawUrl();
          }, 0);
          this.ocrNode$
            .pipe(takeUntil(this.subjectDestroy))
            .subscribe((res) => {
              if (res !== null && res !== undefined) {
                this.init(res);
                this.loadingFirstTime = false;
              } else {
                this.Dong();
              }
            });
        } else {
          this.Dong();
        }
      });
  }

  init(file: OcrNodeModel) {
    if (file.type !== 'folder') {
      this.page = 1;
      this.initFirstGiaoDien(file);
    }
  }

  initFirstGiaoDien(ocrNode: OcrNodeModel) {
    if (
      ocrNode.state === -1 &&
      ocrNode.ocr !== null &&
      ocrNode.ocr !== undefined
    ) {
      if (!this.showNhanDang) this.showNhanDang = true;
      this.numberCol = 3;
      this.isShowImg = true;
      this.isShowOcrtext = true;
      this.isShowMetadata = true;
      this.lstOcrText = ocrNode.ocr.pages;
    } else {
      this.numberCol = 1;
      this.isShowImg = true;
      this.isShowOcrtext = false;
      this.isShowMetadata = false;
    }
    this.cd.detectChanges();
  }

  initFileRawUrl() {
    this.isImageLoading.next(true);
    this.serviceStore.getFileRawUrl(this.fileId, this.page).subscribe(
      (data) => {
        this.createImageFromBlob(data);
        this.isImageLoading.next(false);
        this.cd.detectChanges();
      },
      (error) => {
        this.isImageLoading.next(false);
        console.log(error);
      }
    );
  }

  Dong() {
    this.eventCloseComponentFile.emit(true);
    this.ngOnDestroy();
  }

  ClickFullSreen() {
    this.isFullScreen = !this.isFullScreen;
    this.eventFullSreen.emit(this.isFullScreen);
  }

  nhanDang() {
    this.showNhanDang = false;
    this.ocrNode$.pipe(take(1)).subscribe((res) => {
      this.serviceStore.nhanDang(res).pipe(take(1)).subscribe();
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
    this.serviceStore
      .download(this.fileId)
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
    this.initFileRawUrl();
  }

  save() {
    this.ocrNode$.pipe(take(1)).subscribe((res) => {
      this.serviceStore.save(res).subscribe();
    });
  }
}

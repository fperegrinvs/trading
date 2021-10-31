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
export class OcrFileInfoComponent implements OnInit, OnDestroy, OnChanges {
  isFullSreen: boolean = false;
  showBtnExtract: boolean = false;

  ocrtext: string;
  page: number;
  subjectDestroy = new Subject();
  numberCol: number;
  isShowImg: boolean;
  isShowOcrtext: boolean;
  isShowMetadata: boolean;

  @Input('ocrNode')
  ocrNode: OcrNodeModel;
  ocrNode$: Observable<OcrNodeModel>;

  @Output('isFullSreen') eventFullSreen = new EventEmitter(false);
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

  init() {
    this.ocrNode$
      .pipe(
        take(1),
        tap((file) => {
          if (file.type !== 'folder') {
            this.page = 1;
            this.initFirstGiaoDien(file);
            this.initFirstOcrFile(file);
            this.initFileRawUrl(file);
          }
        })
      )
      .subscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ocrNode) {
      debugger;
      console.log('----------');
      console.log(this.ocrNode);
      console.log('----------');
      this.loadingFirstTime = true;
      this.ocrNode$ = this.serviceStore.getOcrNodeById(this.ocrNode.id);
      this.init();
      this.loadingFirstTime = false;
    }
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
    const done: boolean = false;
    const sb = this.ocrNode$
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((res) => {
        if (res.state === -1) {
          this.pageOcr = res.ocr.pages;
          console.log('=================');
          console.log(res);
          console.log('=================');
          this.numberCol = 3;
          this.isShowImg = true;
          this.isShowOcrtext = true;
          this.isShowMetadata = true;
          sb.unsubscribe();
        }
      });
  }

  initFirstGiaoDien(ocrNode: OcrNodeModel) {
    if (ocrNode.state === -1) {
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

  initFileRawUrl(ocrNode: OcrNodeModel) {
    if (ocrNode.page_count < this.page) this.page = 1;
    this.serviceStore.getFileRawUrl(ocrNode.id, this.page).subscribe(
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

  initFirstOcrFile(file: OcrNodeModel) {
    if (file.state === -1) {
      this.ocrtext = file.ocr.pages[this.page - 1];
      this.numberCol = 3;
      this.isShowImg = true;
      this.isShowOcrtext = true;
      this.isShowMetadata = true;
      this.cd.detectChanges();
    }
  }

  Dong() {
    this.eventCloseComponentFile.emit(true);
    this.ngOnDestroy();
  }

  ClickFullSreen() {
    this.isFullSreen = !this.isFullSreen;
    this.eventFullSreen.emit(this.isFullSreen);
  }

  nhanDang() {
    this.ocrNode$.pipe(take(1)).subscribe((res) => {
      this.serviceStore.nhanDang(res).subscribe((res) => {
        this.init();
      });
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
      .download(this.ocrNode.id)
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
    this.ocrNode$.pipe(take(1)).subscribe((file) => {
      if (file.state === -1 && file.ocr) {
        debugger;
        this.ocrtext = file.ocr.pages[this.page - 1];
      } else if (file.state === -1 && this.pageOcr) {
        this.ocrtext = this.pageOcr[this.page - 1];
      } else if (this.pageOcr) {
        this.ocrtext = this.pageOcr[this.page - 1];
      }
      this.initFileRawUrl(file);
      this.cd.detectChanges();
    });
  }
}

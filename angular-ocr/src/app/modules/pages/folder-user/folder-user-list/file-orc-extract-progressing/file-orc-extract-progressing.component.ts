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
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Ocr } from '../../models/ocr-file-progressing.model';

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
  ocrtext: string =
    '                                                                                                                                                                                                                                                                                                                                                                                    03800000099                                                             1\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    '\n' +
    'Nơi nhân:Trên tống tốngBan Bí thư Trung ương Đảng;\n' +
    '- Thủ tướng, các phó thủ tướng chính phủ;\n' +
    '- Các Bộ, cơ quan ngang bộ, cơ quan thuộc chính phủ;\n' +
    '\n' +
    '\n' +
    '- Văn phòng trung ương và các ban của Đảng,\n' +
    '- Văn phỏng tổng bí thư;- Văn phòng chủ tịch nước;                                                      MNG                                                                                                                                                                                                                                                                             03100000099\n' +
    'Hội đồng Dân tộc và các Ủy ban của Quốc hội\n' +
    '- Văn phòng quốc hội;\n' +
    '- Toả án nhân dân tối cao;\n' +
    '\n' +
    'Kiểm toán nhà nước- Viện Kiểm sát nhân dân tối cao;                               Nguyễn Tấn Dũng                                                                                                                             03100000009903100000029                                             03100000099\n' +
    'Uy ban giám sát tài chính quốc gia;\n' +
    'Ngân hàng chính sách xã hội\n' +
    '- Ngân hàng phát triển việt nam;\n' +
    'Uy ban trung ương mặt trận tổ quốc việt nam\n' +
    'Cơ quan trung ương của các đoàn thể\n' +
    '\n' +
    'Hội đông canh tranhne\n' +
    'VPCP: BTCN, Các PCN, Trợ lý TTg, TGĐ Cổng TTĐT, TGĐ NGHI                                                                                                                r\n' +
    '\n' +
    'Các Vu, Cục, đơn vị trực thuộc;\n' +
    'Lưu: VT, TCCV (3b)..H 240                               1';
  page = 1;
  subjectDestroy = new Subject();
  ocr: Ocr;
  numberCol: number = 3;
  isShowImg: boolean = true;
  isShowOcrtext: boolean = true;
  isShowMetadata: boolean = true;

  @Output('isFullSreen') eventFullSreen = new EventEmitter(false);
  @ViewChild('imgBox') imgBox: ElementRef;
  @ViewChild('dragHover') dragHover: ElementRef;
  @ViewChild('textareaEle') textareaEle: ElementRef;

  imageToShow: any;
  isImageLoading: boolean = true;

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
    this.service.activeFile$
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((file) => {
        this.service.getInfoFileById(file.id).subscribe((res) => {
          this.file = res.item;
          this.ocr = res.ocr;
        });
        this.initFileRawUrl(file.id);
      });
  }

  initFileRawUrl(fileId: string) {
    this.service.getFileRawUrl(fileId, this.page).subscribe(
      (data) => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      },
      (error) => {
        this.isImageLoading = false;
        console.log(error);
      }
    );
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
              this.ocr = res.ocr;
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
    this.initFileRawUrl(this.file.id);
  }
}

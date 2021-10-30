import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { OcrNodeModel } from '../../models/ocr-node.model';
import { FolderUserStore } from '../../services/folder-user-store.store';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ocr-node-row-file, [app-ocr-node-row-file]',
  templateUrl: 'ocr-node-row-file.component.html',
  styleUrls: ['ocr-node-row-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OcrNodeRowFileComponent implements OnInit, OnDestroy, OnChanges {
  @Input('ocrNode')
  ocrNode: OcrNodeModel;
  callTimer: boolean = false;
  spaces: number[] = [];
  subjectDestroy = new Subject();
  private readonly _showDoneOcr = new BehaviorSubject<boolean>(false);
  readonly showDoneOcr$ = this._showDoneOcr.asObservable();

  constructor(
    public serviceStore: FolderUserStore,
    public cd: ChangeDetectorRef
  ) {}

  get showDoneOcr() {
    return this._showDoneOcr.getValue();
  }

  set showDoneOcr(val: boolean) {
    this._showDoneOcr.next(val);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ocrNode) {
      if (this.ocrNode.ocring?.percent === 100) {
        this.showDoneOcr = true;
      }
      if (this.ocrNode.state === 1 || this.ocrNode.state === 2) {
        this.serviceStore.fechStateFileTimer(this.ocrNode);
      }
    }
  }

  ngOnInit() {
    for (let index = 0; index < this.ocrNode.level; index++) {
      this.spaces.push(1);
    }
    this.serviceStore.activeOcrNode$
      .pipe(takeUntil(this.subjectDestroy))
      .pipe(
        tap((res) => {
          if (res.id === this.ocrNode.id) {
            if (this.showDoneOcr) this.showDoneOcr = false;
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subjectDestroy.next();
    this.subjectDestroy.complete();
  }

  getTitleSize(size: number): string {
    return this.formatBytes(size);
  }

  formatBytes(a: number, b = 2, k = 1024) {
    let d = Math.floor(Math.log(a) / Math.log(k));
    return 0 == a
      ? '0 Bytes'
      : parseFloat((a / Math.pow(k, d)).toFixed(Math.max(0, b))) +
          ' ' +
          ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d];
  }

  getRoundPercent(percent: number) {
    return Math.round(percent);
  }
}

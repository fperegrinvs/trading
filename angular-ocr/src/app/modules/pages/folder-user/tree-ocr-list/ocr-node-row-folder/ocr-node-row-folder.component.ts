import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';
import { OcrNodeModel } from '../../models/ocr-node.model';
import { FolderUserStore } from '../../services/folder-user-store.store';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ocr-node-row-folder, [app-ocr-node-row-folder]',
  templateUrl: 'ocr-node-row-folder.component.html',
  styleUrls: ['ocr-node-row-folder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OcrNodeRowFolderComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input('ocrNode') ocrNode: OcrNodeModel;

  spaces: number[] = [];

  subjectDestroy = new Subject();
  clickCount = 0;

  constructor(
    public serviceStore: FolderUserStore,
    public cd: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.subjectDestroy.next();
    this.subjectDestroy.complete();
  }

  ngOnInit() {
    for (let index = 0; index < this.ocrNode.level; index++) {
      this.spaces.push(1);
    }
  }

  activeNode() {
    this.serviceStore.activeOcrNode = this.ocrNode;
  }

  async clickOpenFolder(mustCall: boolean = true) {
    this.ocrNode.isOpen = !this.ocrNode.isOpen;
    await this.serviceStore.clickFolder(this.ocrNode);

    if (!this.ocrNode.isOpen) {
      setTimeout(() => this.serviceStore.closeFolder(this.ocrNode), 250);
    }
  }

  @HostListener('click', ['$event']) clickEvent(event: any) {
    this.clickCount++;
    this.activeNode();
    setTimeout(() => {
      if (this.clickCount === 2) {
        this.clickOpenFolder(true);
      }
      this.clickCount = 0;
      this.cd.detectChanges();
    }, 250);
  }
}

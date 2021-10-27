import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { tap } from 'rxjs/operators';
import { OcrNodeModel } from '../../models/ocr-node.model';
import { FolderUserStore } from '../../services/folder-user-store.store';

@Component({
  selector: 'app-ocr-node-row-folder, [app-ocr-node-row-folder]',
  templateUrl: 'ocr-node-row-folder.component.html',
  styleUrls: ['ocr-node-row-folder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OcrNodeRowFolderComponent implements OnInit {
  @Input('ocrNode') ocrNode: OcrNodeModel;
  isActive: boolean = false;

  newOcrNode: OcrNodeModel;
  constructor(
    public serviceStore: FolderUserStore,
    public cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.newOcrNode = { ...this.ocrNode, name: 'xin chào' };
    this.serviceStore.activeOcrNode$.pipe(
      tap((res) => {
        if (res.id === this.ocrNode.id) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      })
    );
  }

  activeNode() {
    this.serviceStore.activeOcrNode = this.ocrNode;
  }
}

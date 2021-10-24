import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { OcrNodeModel } from '../../models/ocr-node.model';
import { FolderUserService } from '../../services/folder-user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-folder-node-list, [app-folder-node-list]',
  templateUrl: 'folder-node-list.component.html',
  styleUrls: ['/folder-node-list.component.scss'],
})
export class FolderNodeListComponent implements OnInit, OnDestroy, OnChanges {
  @Input('folder')
  folder?: OcrNodeModel;
  isOpen: boolean = false;
  isActive: boolean = false;
  subjectDestroy = new Subject();

  constructor(
    public service: FolderUserService,
    public cd: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.folder) {
      this.cd.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.subjectDestroy.next();
    this.subjectDestroy.complete();
  }

  ngOnInit() {
    this.service.activeFolder$
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((res) => {
        if (!res) return;
        if (this.folder.id === res.id) {
          this.isActive = true;
        } else this.isActive = false;
      });
  }

  activeFolder() {
    this.service.activeFolder(this.folder);
  }

  clickInsideFolder(folder: OcrNodeModel) {
    this.isOpen = !this.isOpen;
    this.service.activeFolder(folder);
  }

  @HostListener('click', ['$event']) clickEvent(event: any) {
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.service.openFolder(this.folder);
  }
}

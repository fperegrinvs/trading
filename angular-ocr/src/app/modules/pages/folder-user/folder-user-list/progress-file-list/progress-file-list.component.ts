import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { shareReplay, takeUntil, tap } from 'rxjs/operators';
import { FolderUserService } from '../../services/folder-user.service';
import { OcrNodeModel } from '../../models/ocr-node.model';
import { FileModel } from '../../models/file.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector:
    'app-progress-file-list-component, [app-progress-file-list-component]',
  templateUrl: 'progress-file-list.component.html',
  styleUrls: ['progress-file-list.component.scss'],
})
export class ProgressFileListComponent implements OnInit, OnChanges, OnDestroy {
  @Input('childs')
  childs?: any[];
  subjectDestroy = new Subject();
  private subjectFiles = new BehaviorSubject<FileModel[]>([]);
  files$: Observable<FileModel[]> = this.subjectFiles.asObservable();
  private subjectFoldes = new BehaviorSubject<OcrNodeModel[]>([]);
  folders$: Observable<OcrNodeModel[]> = this.subjectFoldes.asObservable();

  constructor(
    public service: FolderUserService,
    public cd: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.subjectDestroy.next();
    this.subjectDestroy.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.childs) {
      this.initFilesFolders();
      this.cd.detectChanges();
    }
  }

  initFilesFolders() {
    const lstFile = this.childs.filter((item) => item.type !== 'folder');
    this.subjectFiles.next(lstFile);
    const lstFolder = this.childs.filter((item) => item.type === 'folder');
    this.subjectFoldes.next(lstFolder);
  }

  ngOnInit() {
    this.initFilesFolders();
    this.subjectFiles
      .asObservable()
      .pipe(takeUntil(this.subjectDestroy), shareReplay())
      .subscribe((files) => {
        files.forEach((file, index) => {
          if (file.state === 1 || file.state === 2)
            this.service.loadOcrFileProgressById(file.id);
        });
      });

    this.service.activeFile$
      .pipe(
        takeUntil(this.subjectDestroy),
        shareReplay(),
        tap((res) => this.cd.detectChanges())
      )
      .subscribe((res) => {});

    this.service.lstOcrFileProgress$
      .pipe(
        takeUntil(this.subjectDestroy),
        shareReplay(),
        tap((res) => this.cd.detectChanges())
      )
      .subscribe();
  }

  clickFile(file: FileModel) {
    this.service.activeFile(file);
    this.service.openShowComponentProgressFile();
  }

  roudPercent(percent: number) {
    return Math.round(percent);
  }
}

import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthStore } from '../../../../auth/auth.store';
import { FolderUserService } from '../../services/folder-user.service';
import { OcrNodeModel } from '../../models/ocr-node.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-upload-file-task',
  templateUrl: 'upload-file-task.component.html',
  styleUrls: ['upload-file-task.component.scss'],
})
export class UploadFileTaskComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() file: File;
  subject = new BehaviorSubject<number>(0);
  percentage$ = this.subject.asObservable();
  color: string = 'primary';
  isPause: boolean = false;
  seconds: number = 10;
  folderAcive: OcrNodeModel;
  isRootFolder: boolean = true;

  subjectDestroy = new Subject();

  constructor(public service: FolderUserService, private auth: AuthStore) {}

  ngOnDestroy(): void {
    this.subjectDestroy.next();
    this.subjectDestroy.complete();
  }

  ngOnInit() {
    this.subject.pipe(takeUntil(this.subjectDestroy)).subscribe((res) => {
      if (res == 100) this.color = 'warn';
    });

    this.service.activeFolder$
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((res) => {
        this.folderAcive = res;
        this.isRootFolder = false;
      });

    this.service.isRootFolder$
      .pipe(takeUntil(this.subjectDestroy))
      .subscribe((res) => {
        this.isRootFolder = res;
      });
  }

  ngAfterViewInit(): void {
    this.startUpload();
  }

  startUpload() {
    let id = '';
    if (!this.isRootFolder) {
      id = this.folderAcive.id;
    }
    this.service.uploadFile(id, this.file).subscribe(
      (res) => {
        this.subject.next(100);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getFileName() {
    const maxLength = 20;
    const length = this.file.name.length;
    let name = this.file.name.substr(0, maxLength);
    if (length > maxLength) {
      let split = this.file.name.split('.');
      name = name + '...' + split[split.length - 1];
    }
    return this.file.name;
  }

  clickPlay() {
    this.isPause = false;
  }

  clickPause() {
    this.isPause = true;
  }
}

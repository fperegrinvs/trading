import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OcrMainService } from '../../service/ocr-main.service';
import {
  FolderOcrFileStateModel,
  OcrFileStateModel,
} from '../../models/ocr-file-state.model';
import { AuthStore } from '../../../../auth/auth.store';

@Component({
  selector: 'ocr-upload-task',
  templateUrl: 'ocr-upload-task.component.html',
  styleUrls: ['./ocr-upload-task.component.scss'],
})
export class OcrUploadTaskComponent implements OnInit {
  @Input() file: File;
  subject = new BehaviorSubject<number>(0);
  percentage$ = this.subject.asObservable();
  color: string = 'primary';
  isPause: boolean = false;
  seconds: number = 10;
  folderAcive: FolderOcrFileStateModel;

  constructor(public service: OcrMainService, private auth: AuthStore) {}

  ngOnInit() {
    this.startUpload();
    this.subject.subscribe((res) => {
      if (res == 100) this.color = 'warn';
    });

    this.service.folderActive$.subscribe((res) => {
      this.folderAcive = res;
    });
  }

  async startUpload() {
    this.service.uploadFileDocument(this.file).subscribe((res) => {
      this.subject.next(100);
      const ocrFile = new OcrFileStateModel();
      ocrFile.documentFileRawUrlId = res.id;
      ocrFile.name = this.getFileName();
      ocrFile.createdBy = this.auth.getUsername();
      ocrFile.editedBy = this.auth.getUsername();
      this.service.getDocument(res.id).subscribe((data) => {
        ocrFile.taskId = data.task_id;
        ocrFile.fileRawUrl = data.pages[0].image;
        this.service.findAndUpateFileIntoOcrModel(
          ocrFile,
          this.folderAcive._id
        );
      });
    });
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

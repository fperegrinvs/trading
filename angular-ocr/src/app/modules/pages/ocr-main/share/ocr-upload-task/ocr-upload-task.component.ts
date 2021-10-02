import { Component, Input, OnInit, ViewEncapsulation, Output } from '@angular/core';
import { Observer, of, Observable, BehaviorSubject } from 'rxjs';

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
  constructor() {}

  ngOnInit() {
    this.startUpload();
    this.subject.subscribe((res) => {
      if (res == 100) this.color = 'warn';
    });
  }

  async startUpload() {
    let min = 0;
    let max = 99;
    for (let index = 1; index <= 10; index++) {
      this.seconds = this.seconds - 1;
      await this.delay(1000);
      if (index == 10) {
        this.subject.next(100);
        return;
      }
      let ramdonInterger = this.randomInteger(min, max);
      min = ramdonInterger + 1;
      this.subject.next(ramdonInterger);
    }
  }

  randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getFileName() {
    console.log();
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

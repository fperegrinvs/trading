export class OcrFileProgressingModel {
  fileId: string;
  ocr: Ocr;
  done: boolean;

  constructor() {
    this.fileId = '';
    this.ocr = new Ocr();
    this.done = false;
  }
}

export class Ocr {
  current: number;
  data: string[];
  'detect-lines-time': number;
  percent: number;
  total: number;
  error: string;

  constructor() {
    this.current = 0;
    this.data = [];
    this['detect-lines-time'] = 0;
    this.percent = 0;
    this.total = 0;
    this.error = '';
  }
}

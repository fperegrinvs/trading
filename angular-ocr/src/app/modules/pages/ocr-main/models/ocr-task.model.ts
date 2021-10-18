export enum EState {
  progress = 'PROGRESS',
  pending = 'PENDING',
  success = 'SUCCESS',
  failure = 'FAILURE',
}

export class ProgressReslt {
  data: string;
  'dettect-lines-time': number;
  'predict-time': number;
  current: number;
  total: number;
  percent: number;
}

export class OcrTask {
  state: EState;
  result: ProgressReslt;

  constructor() {
    this.state = undefined;
    this.result = new ProgressReslt();
  }
}

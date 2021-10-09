export enum EState {
  progress = 'PROGRESS',
  pending = 'PENDING',
  success = 'SUCCESS',
  failure = 'FAILURE',
}

export interface ProgressReslt {
  data: string;
  'dettect-lines-time': number;
  'predict-time': number;
  current: number;
  total: number;
  percent: number;
}

export interface OcrTask {
  state: EState;
  result: ProgressReslt;
}

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
}

export class Progressing {
  pending: boolean = false;
  current: number = 0;
  total: number = 0;
  percent: number = 0;
  description: string = '';
}

export interface OcrTask {
  state: EState;
  complete: boolean;
  success: string;
  progress: Progressing;
  result: ProgressReslt;
}

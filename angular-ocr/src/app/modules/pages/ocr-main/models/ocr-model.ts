export class OcrDefault {
  name: string;
  state: string;
  createdBy: string;
  createdDate: Date;
  files: FileOCRModel[];
  isOcr: boolean;
  isExtract: boolean;

  constructor() {
    this.name = '';
    this.state = '';
    this.createdBy = '';
    this.createdDate = new Date();
    this.files = [];
  }
}

export class OcrModel extends OcrDefault {
  id: string;

  constructor() {
    super();
  }
}

export class ProgressOcr {
  task: string;
  pending: boolean;
  current: string;
  total: string;
  percent: string;
  constructor() {
    this.task = undefined;
    this.pending = false;
    this.current = undefined;
    this.total = undefined;
    this.percent = undefined;
  }
}

export class ProgressExtract {
  pending: boolean;
  constructor() {
    this.pending = false;
  }
}
export class FileOCRModel {
  progressOcr: ProgressOcr;
  filesNormal: string;
  filesOcr: string;
  filesExtract: string;
  progressExtract: ProgressExtract;
  constructor() {
    this.progressOcr = new ProgressOcr();
    this.filesExtract = undefined;
    this.filesNormal = undefined;
    this.filesOcr = undefined;
    this.progressExtract = new ProgressExtract();
  }
}

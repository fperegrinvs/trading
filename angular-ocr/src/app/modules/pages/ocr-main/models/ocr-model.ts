import {
  FolderOcrFileStateModel,
  OcrFileStateModel,
} from './ocr-file-state.model';

export class OcrModel {
  _id: string;
  folders: FolderOcrFileStateModel[];
  files: OcrFileStateModel[];
  customerId: string;
  createdBy: string;
  createdDate: Date;
  editedDate: Date;

  constructor() {
    this._id = undefined;
    this.createdBy = undefined;
    this.createdDate = new Date();
    this.editedDate = new Date();
    this.files = [];
    this.folders = [];
    this.customerId = '';
  }
}

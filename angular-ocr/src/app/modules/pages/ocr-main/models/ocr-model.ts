import { FolderOcrFileStateModel, OcrFileStateModel } from './ocr-file-state.model';
export class OcrModel {
  _id: string;
  folders: FolderOcrFileStateModel[];
  files: OcrFileStateModel[];
  name: string;
  createdBy: string;
  createdDate: Date;
  editedDate: Date;
  constructor() {
    this.name = undefined;
    this.createdBy = undefined;
    this.createdDate = new Date();
    this.editedDate = new Date();
    this.files = [];
    this.folders = [];
  }
}

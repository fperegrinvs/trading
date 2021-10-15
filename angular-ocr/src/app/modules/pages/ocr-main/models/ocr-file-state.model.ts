import { MetaDataModel } from './ocr-metadata.model';
import { OcrTask } from './ocr-task.model';

export class OcrFileStateModel {
  _id: string;
  taskId: string;
  completeRecognition: boolean;
  acceptRecognition: boolean;
  progressRecognition: OcrTask;
  isRecognition: boolean;
  isExtractingMetadata: boolean;
  acceptExtractMetadata: boolean;
  completeExtractMetadata: boolean;
  metadata: MetaDataModel;
  documentFileRawUrlId: string;
  fileRawUrl: string;
  fileRecognitionUrl: string;
  fileExtractMetadataUrl: string;
  name: string;
  createdBy: string;
  editedBy: string;
  createdDate: Date;
  editedDate: Date;

  constructor() {
    this.taskId = undefined;
    this.acceptRecognition = false;
    this.isRecognition = false;
    this.isExtractingMetadata = false;
    this.acceptExtractMetadata = false;
    this.fileExtractMetadataUrl = '';
    this.fileRecognitionUrl = '';
    this.fileRawUrl = '';
    this.completeExtractMetadata = false;
    this.name = '';
    this.documentFileRawUrlId = '';
    this.createdDate = new Date();
    this.editedDate = new Date();
    this.editedBy = undefined;
  }
}

export class FolderOcrFileStateModel {
  _id: string;
  name: string;
  createdBy: string;
  createdDate: Date;
  editedDate: Date;
  editedBy: string;
  folders: FolderOcrFileStateModel[];
  files: OcrFileStateModel[];
  isOpen: boolean;

  constructor() {
    this._id = undefined;
    this.name = '';
    this.folders = [];
    this.files = [];
    this.createdDate = new Date();
    this.editedDate = new Date();
    this.createdBy = undefined;
    this.editedBy = undefined;
    this.isOpen = false;
  }
}

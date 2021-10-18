import { MetaDataModel } from './ocr-metadata.model';
import { OcrTask } from './ocr-task.model';
import ObjectID from 'bson-objectid';

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
  documentRecognitionUrlId: string;
  dataRecognition: string;
  fileRecognitionUrl: string;
  documentExtractMetadataUrlId: string;
  fileExtractMetadataUrl: string;
  name: string;
  createdBy: string;
  editedBy: string;
  createdDate: Date;
  editedDate: Date;

  constructor() {
    this._id = new ObjectID().toString();
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
    this.dataRecognition = '';
    this.progressRecognition = new OcrTask();
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
    this._id = new ObjectID().toString();
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

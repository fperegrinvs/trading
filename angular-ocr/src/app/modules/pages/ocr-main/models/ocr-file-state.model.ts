import {MetaDataModel} from './ocr-metadata.model';
import {OcrTask} from './ocr-task.model';

export class OcrFileStateModel {
  id: string;
  taskId: string;
  completeRecognition: boolean;
  acceptRecognition: boolean;
  progressRecognition: OcrTask;
  isRecognition: boolean;
  isExtractingMetadata: boolean;
  acceptExtractMetadata: boolean;
  completeExtractMetadata: boolean;
  metadata: MetaDataModel;
  filesRawUrl: string;
  filesRecognitionUrl: string;
  filesExtractMetadataUrl: string;
  name: string;
  createdBy: string;
  createdDate: Date;
  editedDate: Date;

  constructor() {
    this.taskId = '';
    this.acceptRecognition = false;
    this.isRecognition = false;
    this.isExtractingMetadata = false;
    this.acceptExtractMetadata = false;
    this.filesExtractMetadataUrl = '';
    this.filesRecognitionUrl = '';
    this.filesRawUrl = '';
    this.name = '';
    this.createdDate = new Date();
    this.editedDate = new Date();
  }
}

export class FolderOcrFileStateModel {
  id: string;
  folders: FolderOcrFileStateModel[];
  files: OcrFileStateModel[];

  constructor() {
    this.id = undefined;
    this.folders = [];
    this.files = [];
  }
}

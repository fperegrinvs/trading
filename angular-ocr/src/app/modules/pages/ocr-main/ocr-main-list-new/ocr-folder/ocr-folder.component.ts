import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  HostListener,
} from '@angular/core';
import { OcrMainService } from '../../service/ocr-main.service';
import { FolderOcrFileStateModel } from '../../models/ocr-file-state.model';

@Component({
  selector: 'table-ocr-folder, [table-ocr-folder]',
  templateUrl: 'ocr-folder.component.html',
  styleUrls: ['./ocr-folder.component.scss'],
})
export class OcrFolderComponent implements OnInit {
  @Input('lengthColTable')
  lengthColTable: number;
  @Input('lengthMetadata')
  lengthMetadata: number;
  @Input('folder') folder: FolderOcrFileStateModel;

  isActive: boolean;

  constructor(public service: OcrMainService) {}

  ngOnInit() {
    this.service.folderActive$.subscribe((res: FolderOcrFileStateModel) => {
      if (res._id === undefined) {
        this.isActive = false;
      } else if (res._id !== this.folder._id) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }

      console.log('this.isActive', this.isActive);
    });
  }

  getStateOCR(model: FolderOcrFileStateModel): string {
    let index = 0;
    if (model.files.length > 0) {
      model.files?.forEach((file) => {
        if (file.isRecognition) {
          index = index + 1;
        }
      });
    }
    if (model.folders.length > 0) {
      model.folders?.forEach((folder) => {
        index = this.getIndexOcr(index, folder);
      });

      if (index != 0) {
        return 'Đang nhận dạng ' + index + ' tập tin';
      }
      return '';
    }
  }

  getIndexOcr(
    index: number,
    folderOcrFileStateModel: FolderOcrFileStateModel
  ): number {
    if (folderOcrFileStateModel.files.length > 0) {
      folderOcrFileStateModel.files?.forEach((file) => {
        if (file.isRecognition) index = index + 1;
      });
      index = this.getIndexOcr(index, folderOcrFileStateModel);
    }
    return index;
  }

  getStateExtract(model: FolderOcrFileStateModel): string {
    let index = 0;
    if (model.files.length > 0) {
      model.files?.forEach((file) => {
        if (file.isRecognition) {
          index = index + 1;
        }
      });
    }
    if (model.folders.length > 0) {
      model.folders?.forEach((folder) => {
        index = this.getIndexExtract(index, folder);
      });
    }
    if (index != 0) {
      return 'Đang trích xuất ' + index + ' tập tin';
    }
    return '';
  }

  getIndexExtract(
    index: number,
    folderOcrFileStateModel: FolderOcrFileStateModel
  ): number {
    if (folderOcrFileStateModel.files.length > 0) {
      folderOcrFileStateModel.files?.forEach((file) => {
        if (file.isExtractingMetadata) index = index + 1;
      });
      index = this.getIndexExtract(index, folderOcrFileStateModel);
      return index;
    }
  }

  getStateNormal(model: FolderOcrFileStateModel): string {
    let index = 0;
    if (model.files.length > 0) {
      model.files?.forEach((file) => {
        if (!file.taskId) {
          index = index + 1;
        }
      });
    }
    if (model.folders.length > 0) {
      model.folders?.forEach((folder) => {
        index = this.getIndexExtract(index, folder);
      });
    }
    if (index != 0) {
      return index + ' tập tin mới';
    }
    return '';
  }

  getIndexStateNormal(
    index: number,
    folderOcrFileStateModel: FolderOcrFileStateModel
  ): number {
    if (folderOcrFileStateModel.files.length > 0) {
      folderOcrFileStateModel.files?.forEach((file) => {
        if (!file.taskId) index = index + 1;
      });
      index = this.getIndexStateNormal(index, folderOcrFileStateModel);
      return index;
    }
  }

  activeFolder() {
    this.service.activeFolder(this.folder);
    this.isActive = true;
  }

  clickInsideFolder(folder: FolderOcrFileStateModel) {
    folder.isOpen = !folder.isOpen;
    this.service.activeFolder(folder);
  }

  @HostListener('click', ['$event']) clickEvent(event: any) {
    this.folder.isOpen = !this.folder.isOpen;
  }
}

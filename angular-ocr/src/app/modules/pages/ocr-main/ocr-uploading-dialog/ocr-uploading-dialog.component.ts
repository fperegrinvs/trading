import { OcrMainService } from './../service/ocr-main.service';
import { OcrModel } from './../models/ocr-model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OcrFileStateModel } from '../models/ocr-file-state.model';

@Component({
  selector: 'ocr-uploading-dialog',
  templateUrl: 'ocr-uploading-dialog.component.html',
  styleUrls: ['./ocr-uploading-dialog.component.scss'],
})
export class OcrUploadingDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<OcrUploadingDialogComponent>, public service: OcrMainService) {}
  isHovering: boolean;
  files: File[] = [];
  @Output('files') eventFiles = new EventEmitter<File[]>();
  @Input('ocrModel')
  ocrModel: OcrModel;

  @Output('emitOcrModel')
  eventOcrModel: EventEmitter<OcrModel> = new EventEmitter<OcrModel>();
  ngOnInit() {
    if (!this.ocrModel._id) {
      this.ocrModel = this.createNewOcrModel();
    }
  }

  createNewOcrModel() {
    let ocrModel = new OcrModel();
    ocrModel.createdBy = 'admin';

    return ocrModel;
  }

  fileBrowserHander(event: any) {}

  async handleDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
      await this.service.uploadFile(files.item(i)).subscribe((res) => {
        let ocrFile = this.createNewOcrFileState(files.item(i));
        ocrFile.filesRawUrl = res.filePathURL;
        this.ocrModel.files.push(ocrFile);
        console.log('ocrFile', ocrFile);
        if (i == files.length - 1) {
          this.ocrModel.name = files.item(0).name.split('.')[0];

          this.service.addNew(this.ocrModel).subscribe(
            (res) => {
              this.eventOcrModel.emit(res);
              this.eventFiles.emit(this.files);
            },
            (error) => console.log(error)
          );
        }
      });
    }
  }

  createNewOcrFileState(file: File) {
    let ocrFileState = new OcrFileStateModel();
    ocrFileState.name = file.name;
    ocrFileState.createdBy = 'admin';
    return ocrFileState;
  }
  dropzoneState(event: any) {
    this.isHovering = event;
  }
}

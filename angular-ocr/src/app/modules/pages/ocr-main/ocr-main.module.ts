import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GeneralModule} from '../../general-share.module';

import {OcrMainEditOcrDialogComponent} from './ocr-main-edit-ocr-dialog/ocr-main-edit-ocr-dialog.component';

import {OcrMainListComponent} from './ocr-main-list/ocr-main-list.component';
import {OcrUploadTaskComponent} from './share/ocr-upload-task/ocr-upload-task.component';
import {OcrMainService} from './service/ocr-main.service';
import {OcrActionFilesComponent} from './share/ocr-action-files/ocr-action-files.component';
import {OcrProgressingDialogComponent} from './ocr-progressing-dialog/ocr-progressing-dialog.component';
import {OcrUploadingDialogComponent} from './ocr-uploading-dialog/ocr-uploading-dialog.component';
import {OcrProgressTask} from './share/ocr-progress-task/ocr-progress-task.component';
import {OcrMainListNewComponent} from './ocr-main-list-new/ocr-main-list-new.component';
import {OcrMainAddfolderDialogComponent} from "./ocr-main-add-folder-dialog/ocr-main-add-folder-dialog.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OcrMainListNewComponent,
        children: [],
      },
      {
        path: 'old',
        component: OcrMainListComponent,
        children: [],
      },
    ]),
    GeneralModule,
  ],
  exports: [],
  entryComponents: [
    OcrMainEditOcrDialogComponent,
    OcrUploadTaskComponent,
    OcrProgressingDialogComponent,
    OcrUploadingDialogComponent,
    OcrProgressTask,
    OcrMainAddfolderDialogComponent
  ],
  declarations: [
    OcrMainListComponent,
    OcrMainEditOcrDialogComponent,
    OcrActionFilesComponent,
    OcrUploadTaskComponent,
    OcrProgressingDialogComponent,
    OcrUploadingDialogComponent,
    OcrProgressTask,
    OcrMainListNewComponent,
    OcrMainAddfolderDialogComponent
  ],
  providers: [OcrMainService],
})
export class OcrMainModule {
}

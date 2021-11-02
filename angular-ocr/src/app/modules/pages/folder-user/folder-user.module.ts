import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneralModule } from '../../general-share.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FolderUserComponent } from './folder-user.component';
import { AddNewFolderUserDialogComponent } from './add-new-folder-user-dialog/add-new-folder-user-dialog.component';
import { AddNewFileDialogComponent } from './add-new-file-dialog/add-new-file-dialog.component';
import { UploadFileTaskComponent } from './shares/upload-file-task/upload-file-task.component';
import { FileUploadingDialogComponent } from './add-new-file-dialog/file-uploading-dialog/file-uploading-dialog.component';
import { OcrProgressingComponent } from './tree-ocr-list/ocr-file-info/ocr-progressing/ocr-progressing.component';
import { OcrFilePageComponent } from './tree-ocr-list/ocr-file-info/ocr-file-page/ocr-file-page.component';
import { OcrTableMetadataComponent } from './tree-ocr-list/ocr-file-info/ocr-table-metadata/ocr-table-metadata.component';
import { FolderUserStore } from './services/folder-user-store.store';
import { OcrNodeService } from './services/ocr-node.service';
import { TreeOcrListComponent } from './tree-ocr-list/tree-ocr-list.component';
import { OcrNodeRowFolderComponent } from './tree-ocr-list/ocr-node-row-folder/ocr-node-row-folder.component';
import { OcrNodeRowFileComponent } from './tree-ocr-list/ocr-node-row-file/ocr-node-row-file.component';
import { OcrFileInfoComponent } from './tree-ocr-list/ocr-file-info/ocr-file-info.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FolderUserComponent,
        children: [
          {
            path: '',
            component: TreeOcrListComponent,
          },
        ],
      },
    ]),
    GeneralModule,
    DragDropModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    OverlayModule,
  ],
  exports: [],
  entryComponents: [
    AddNewFolderUserDialogComponent,
    AddNewFileDialogComponent,
    FileUploadingDialogComponent,
  ],
  declarations: [
    FolderUserComponent,
    AddNewFolderUserDialogComponent,
    AddNewFileDialogComponent,
    UploadFileTaskComponent,
    FileUploadingDialogComponent,
    OcrProgressingComponent,
    OcrFilePageComponent,
    OcrTableMetadataComponent,
    TreeOcrListComponent,
    OcrNodeRowFolderComponent,
    OcrNodeRowFileComponent,
    OcrFileInfoComponent,
  ],
  providers: [FolderUserStore, OcrNodeService],
})
export class FolderUserModule {}

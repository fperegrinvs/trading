import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GeneralModule } from '../../general-share.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FolderUserListComponent } from './folder-user-list/folder-user-list.component';
import { FolderUserComponent } from './folder-user.component';
import { FolderUserService } from './services/folder-user.service';
import { AddNewFolderUserDialogComponent } from './add-new-folder-user-dialog/add-new-folder-user-dialog.component';
import { ProgressFileListComponent } from './folder-user-list/progress-file-list/progress-file-list.component';
import { FileOrcExtractProgressingComponent } from './folder-user-list/file-orc-extract-progressing/file-orc-extract-progressing.component';
import { FolderNodeListComponent } from './folder-user-list/folder-node-list/folder-node-list.component';
import { AddNewFileDialogComponent } from './add-new-file-dialog/add-new-file-dialog.component';
import { UploadFileTaskComponent } from './shares/upload-file-task/upload-file-task.component';
import { FileUploadingDialogComponent } from './add-new-file-dialog/file-uploading-dialog/file-uploading-dialog.component';
import { OcrProgressingComponent } from './folder-user-list/file-orc-extract-progressing/ocr-progressing/ocr-progressing.component';
import { OcrFilePageComponent } from './folder-user-list/file-orc-extract-progressing/ocr-file-page/ocr-file-page.component';
import { OcrTableMetadataComponent } from './folder-user-list/file-orc-extract-progressing/ocr-table-metadata/ocr-table-metadata.component';
import { FolderUserStore } from './services/folder-user-store.store';
import { OcrNodeService } from './services/ocr-node.service';
import { TreeOcrListComponent } from './tree-ocr-list/tree-ocr-list.component';
import { OcrNodeRowFolderComponent } from './tree-ocr-list/ocr-node-row-folder/ocr-node-row-folder.component';
import { OcrNodeRowFileComponent } from './tree-ocr-list/ocr-node-row-file/ocr-node-row-file.component';

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
  ],
  exports: [],
  entryComponents: [
    AddNewFolderUserDialogComponent,
    AddNewFileDialogComponent,
    FileUploadingDialogComponent,
  ],
  declarations: [
    FolderUserListComponent,
    FolderUserComponent,
    AddNewFolderUserDialogComponent,
    ProgressFileListComponent,
    FileOrcExtractProgressingComponent,
    FolderNodeListComponent,
    AddNewFileDialogComponent,
    UploadFileTaskComponent,
    FileUploadingDialogComponent,
    OcrProgressingComponent,
    OcrFilePageComponent,
    OcrTableMetadataComponent,
    TreeOcrListComponent,
    OcrNodeRowFolderComponent,
    OcrNodeRowFileComponent,
  ],
  providers: [FolderUserService, FolderUserStore, OcrNodeService],
})
export class FolderUserModule {}

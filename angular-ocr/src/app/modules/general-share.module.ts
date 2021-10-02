import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipDirective } from './material/directives/tooltip.directive';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkDetailRowDirective } from './material/directives/cdk-detail-row.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FileDropDirective } from './material/directives/file-drop.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [],
  exports: [
    TooltipDirective,
    CdkDetailRowDirective,
    TranslateModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule,
    FileDropDirective,
    MatProgressBarModule,
    MatTabsModule,
    PdfViewerModule,
    FormsModule,
  ],
  declarations: [TooltipDirective, CdkDetailRowDirective, FileDropDirective],
  providers: [],
})
export class GeneralModule {}

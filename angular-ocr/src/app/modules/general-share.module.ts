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
import { FormsModule } from '@angular/forms';
import { ShareMessagesComponent } from './pages/shares/error-messages/share-messages.component';
import { MatIconModule } from '@angular/material/icon';
import { ShareMessagesService } from './pages/shares/error-messages/share-messages.service';
import { ClickOutsideDirective } from './material/directives/click-outside.directive';
import { DeleteDialogComponent } from './pages/shares/delete-dialog/delete-dialog.component';

@NgModule({
  imports: [MatIconModule, CommonModule, TranslateModule, FormsModule],
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
    FormsModule,
    ShareMessagesComponent,
    MatIconModule,
    ClickOutsideDirective,
  ],
  entryComponents: [DeleteDialogComponent],
  declarations: [
    TooltipDirective,
    CdkDetailRowDirective,
    FileDropDirective,
    ClickOutsideDirective,
    ShareMessagesComponent,
    DeleteDialogComponent,
  ],
  providers: [ShareMessagesService],
})
export class GeneralModule {}

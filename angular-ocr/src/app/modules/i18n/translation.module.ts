import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from './translation.service';

@NgModule({
  imports: [CommonModule, TranslateModule],
  providers: [],
  exports: [CommonModule, TranslateModule],
})
export class TranslationModule {}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslationService } from './modules/i18n/translation.service';
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as viLang } from './modules/i18n/vocabs/vi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private translationService: TranslationService, private router: Router) {
    // register translations
    this.translationService.loadTranslations(viLang, enLang);
  }

  private unsubscribe: Subscription[] = [];

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  ngOnInit(): void {}

  title = 'ocr-angular';
}

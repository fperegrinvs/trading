import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TranslationService} from './modules/i18n/translation.service';
import {locale as enLang} from './modules/i18n/vocabs/en';
import {locale as viLang} from './modules/i18n/vocabs/vi';
import {AuthStore} from "./modules/auth/auth.store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ocr-angular';
  private unsubscribe: Subscription[] = [];

  constructor(private translationService: TranslationService, private router: Router, private authService: AuthStore) {
    // register translations
    this.translationService.loadTranslations(viLang, enLang);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit(): void {
    this.authService.autoAuthUser()
  }
}

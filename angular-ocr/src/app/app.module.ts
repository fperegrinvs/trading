import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AppComponent} from './app.component';
import {LoadingComponent} from './modules/loading/loading.component';
import {LoadingService} from './modules/loading/loading.service';
import {MessagesService} from './modules/messages/messages.service';
import {MessagesComponent} from './modules/messages/messages.component';
import {LoginComponent} from './modules/login/login.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {GeneralModule} from './modules/general-share.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptor} from "./modules/auth/auth-interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    MessagesComponent,
    LoginComponent
  ],
  imports: [
    GeneralModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [LoadingService, MessagesService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: [MessagesComponent]
})
export class AppModule {
}

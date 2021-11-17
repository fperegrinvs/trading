import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './page/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './page/search/search.component';
import { NavigationComponent } from './page/layout/navigation/navigation.component';
import { HeaderComponent } from './page/layout/header/header.component';
import {ADMCommonModule} from "./module/common/common.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from "@angular/common";
import { SearchboxComponent } from './page/layout/header/searchbox/searchbox.component';
import {RightNavComponent} from "./page/layout/header/rightnav/rightnav.component";
import {LoginComponent} from "./page/login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorService} from "./module/authentication/service/interceptor.service";
import { OverlayComponent } from './page/layout/overlay/overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SearchComponent,
    NavigationComponent,
    HeaderComponent,
    SearchboxComponent,
    RightNavComponent,
    LoginComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ADMCommonModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
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
import { StatisticModalComponent } from './page/search/statistic.modal/statistic.modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ChartModule} from "angular2-chartjs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import { DetailComponent } from './page/detail/detail.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { UploadComponent } from './page/upload/upload.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {TagsModalComponent} from './page/detail/tags.modal/tags.modal.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ApproveComponent } from './page/approve/approve.component';
import { ApproveModalComponent } from './page/approve/approve.modal/approve.modal.component';
import { DocformComponent } from './component/docform/docform.component';
import { MyDocumentComponent } from './page/my-document/my-document.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
    OverlayComponent,
    StatisticModalComponent,
    DetailComponent,
    UploadComponent,
    TagsModalComponent,
    ApproveComponent,
    ApproveModalComponent,
    DocformComponent,
    MyDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ADMCommonModule,
    NgbModule,
    HttpClientModule,
    MatDialogModule,
    ChartModule,
    FormsModule,
    NgxSpinnerModule,
    MatTooltipModule,
    NgxDropzoneModule,
    MatTabsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    MatSlideToggleModule
  ],
  providers: [DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

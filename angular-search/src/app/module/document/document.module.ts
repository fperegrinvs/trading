import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorService} from "../authentication/service/interceptor.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DocumentModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchComponent} from "./page/search/search.component";
import {LayoutComponent} from "./page/layout/layout.component";
import {LoginComponent} from "./page/login/login.component";
import {DetailComponent} from "./page/detail/detail.component";
import {UploadComponent} from "./page/upload/upload.component";
import { ApproveComponent } from './page/approve/approve.component';
import { MyDocumentComponent } from './page/my-document/my-document.component';

const routes: Routes = [
  {
    path: "app",
    component: LayoutComponent,
    children: [
      {
        path: "search",
        component: SearchComponent
      },
      {
        path: "bookmark",
        component: SearchComponent
      },
      /*{
        path: "upload",
        component: UploadComponent
      },*/
      {
        path: "detail/:docId",
        component: DetailComponent
      },
      {
        path: "approve",
        component: ApproveComponent
      },
      {
        path: "mydoc",
        component: MyDocumentComponent
      }
    ]
  },
  {
  path: "",
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

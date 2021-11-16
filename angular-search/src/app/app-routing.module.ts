import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchComponent} from "./page/search/search.component";
import {LayoutComponent} from "./page/layout/layout.component";
import {LoginComponent} from "./page/login/login.component";

const routes: Routes = [
  {
    path: "app",
    component: LayoutComponent,
    children: [
      {
        path: "search",
        component: SearchComponent
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

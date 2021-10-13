import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './modules/login/login.component';
import {AuthGuard} from "./modules/auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layouts/layout.module').then((m) => m.LayoutModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'error',
    loadChildren: () => import('./modules/errors/error.module').then((m) => m.ErrorModule),
    canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}

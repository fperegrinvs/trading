import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layouts/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'error',
    loadChildren: () => import('./modules/errors/error.module').then((m) => m.ErrorModule),
  },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

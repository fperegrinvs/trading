import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full',
      },
      {
        path: 'app',
        loadChildren: () => import('./pages/ocr-main/ocr-main.module').then((m) => m.OcrMainModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashBoardModule),
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

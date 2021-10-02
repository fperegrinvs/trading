import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: Error404Component,
        children: [
          {
            path: '404',
            component: Error404Component,
          },
        ],
      },
      { path: '', redirectTo: '404', pathMatch: 'full' },
      {
        path: '**',
        component: Error404Component,
        pathMatch: 'full',
      },
    ]),
  ],
  exports: [],
  declarations: [Error404Component, ErrorComponent],
  providers: [],
})
export class ErrorModule {}

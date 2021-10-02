import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashBoardComponent } from './dashboard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashBoardComponent,
        children: [],
      },
    ]),
  ],
  exports: [],
  declarations: [DashBoardComponent],
  providers: [],
})
export class DashBoardModule {}

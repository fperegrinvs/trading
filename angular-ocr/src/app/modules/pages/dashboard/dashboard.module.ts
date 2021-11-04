import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashBoardComponent } from './dashboard.component';
import {ADMCommonModule} from "../../common/common.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashBoardComponent,
        children: [],
      },
    ]),
    ADMCommonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [],
  declarations: [DashBoardComponent],
  providers: [MatDatepickerModule],
})
export class DashBoardModule {}

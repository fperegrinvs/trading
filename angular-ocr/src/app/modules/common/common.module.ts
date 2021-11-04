import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {ButtonComponent} from "./component/button/button.component";
import {DropdownComponent} from "./component/dropdown/dropdown.component";
import {CommonModule, DatePipe} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DateFilterComponent} from "./component/filter/date-filter.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {SelectionFilterComponent} from "./component/filter/selection-filter.component";
import {NumberFilterComponent} from "./component/filter/number-filter.component";
import {NouisliderModule} from "ng2-nouislider";
import {FormsModule} from "@angular/forms";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    FontAwesomeModule,
    MatDatepickerModule,
    NgxSliderModule,
    FormsModule,
    MatCheckboxModule,
  ],
  exports: [ButtonComponent, DropdownComponent, DateFilterComponent, SelectionFilterComponent, NumberFilterComponent],
  declarations: [ButtonComponent, DropdownComponent, DateFilterComponent, SelectionFilterComponent, NumberFilterComponent],
  providers: [
    DatePipe
  ],
})
export class ADMCommonModule {
}

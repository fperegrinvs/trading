import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TreeComponent} from "./component/tree/tree.component";
import {MatTreeModule} from "@angular/material/tree";
import {TableComponent} from "./component/table/table.component";
import {MatTableModule} from "@angular/material/table";
import {DateFilterComponent} from "./component/filter/date-filter.component";
import {NumberFilterComponent} from "./component/filter/number-filter.component";
import {SelectionFilterComponent} from "./component/filter/selection-filter.component";
import {ButtonComponent} from "./component/button/button.component";
import {DropdownComponent} from "./component/dropdown/dropdown.component";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CardComponent} from "./component/card/card.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";



@NgModule({
  declarations: [
    TreeComponent,
    TableComponent,
    DateFilterComponent,
    NumberFilterComponent,
    SelectionFilterComponent,
    ButtonComponent,
    DropdownComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatCheckboxModule,
    FormsModule,
    MatNativeDateModule
  ],
  exports: [
    TreeComponent,
    TableComponent,
    DateFilterComponent,
    NumberFilterComponent,
    SelectionFilterComponent,
    ButtonComponent,
    DropdownComponent,
    CardComponent
  ]
})
export class ADMCommonModule { }

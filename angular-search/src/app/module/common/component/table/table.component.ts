import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {TableAlignment, TableColumn} from "../../model/TableColumn";

@Component({
  selector: 'Table',
  template: `
    <table mat-table [dataSource]="dataSource" class="w-full">
      <ng-container matColumnDef="{{column.id}}" *ngFor="let column of columns">
        <th
          mat-header-cell
          *matHeaderCellDef
          [class.!text-center]="column.headerAlign === TableAlignment.CENTER"
          [class.!text-left]="column.headerAlign === TableAlignment.LEFT"
          [class.!text-right]="column.headerAlign === TableAlignment.RIGHT"
        >
          <div class="flex items-center px-3">
            <span class="flex-1">
              {{column.text}}
            </span>
            <img class="cursor-pointer h-5" src="assets/icons/bx-sort.svg"/>
          </div>
        </th>
        <td
          mat-cell
          *matCellDef="let element"
          [class.!text-center]="column.cellAlign === TableAlignment.CENTER"
          [class.!text-left]="column.cellAlign === TableAlignment.LEFT"
          [class.!text-right]="column.cellAlign === TableAlignment.RIGHT"
        > {{element[column.id]}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColumns;"></tr>
    </table>
    <Pagination></Pagination>
  `,
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit, OnChanges {

  @Input() columns: TableColumn[] = [];
  @Input() dataSource: any[] = []
  @Input() sizeOptions: number[] = [];

  displayColumns: string[] = [];

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.columns) {
        this.displayColumns = (changes.columns.currentValue as TableColumn[]).map(x => x.id);
        console.log(this.displayColumns);
    }
  }

  get TableAlignment() {
    return TableAlignment;
  }
}

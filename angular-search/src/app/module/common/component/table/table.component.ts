import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
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
            <img *ngIf="column.sortable" class="cursor-pointer h-5" src="assets/icons/bx-sort.svg"/>
          </div>
        </th>
        <td
          mat-cell
          *matCellDef="let element"
          [class.!text-center]="column.cellAlign === TableAlignment.CENTER"
          [class.!text-left]="column.cellAlign === TableAlignment.LEFT"
          [class.!text-right]="column.cellAlign === TableAlignment.RIGHT"
        >
          <span *ngIf="!column.bold">{{element[column.id]}}</span>
          <strong *ngIf="column.bold === true">{{element[column.id]}}</strong>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColumns;"
          (click)="rowClick(row)"
      ></tr>
    </table>
    <Pagination
      [totalItems]="totalItems"
      [sizeOptions]="sizeOptions"
      [page]="page"
      [size]="size"
      (sizeChanged)="onSizeChanged($event)"
      (pageChanged)="onPageChanged($event)"
      *ngIf="pagination"
    ></Pagination>
  `,
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit, OnChanges {

  @Input() columns: TableColumn[] = [];
  @Input() dataSource: any[] = [];
  @Input() sizeOptions: number[] = [];
  @Input() totalItems: number = 0;
  @Input() page: number = 1;
  @Input() pagination: boolean = true;
  @Input() size: number = 10;

  @Output() sizeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() rowClicked: EventEmitter<any> = new EventEmitter<any>();

  displayColumns: string[] = [];

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.columns) {
        this.displayColumns = (changes.columns.currentValue as TableColumn[])
          .filter(x => x.active)
          .map(x => x.id);
    }
  }

  onSizeChanged($event: number): void {
    this.sizeChanged.emit($event);
  }

  onPageChanged($event: number): void {
    this.pageChanged.emit($event);
  }

  rowClick($event: any): void {
    this.rowClicked.emit($event);
  }

  get TableAlignment() {
    return TableAlignment;
  }
}

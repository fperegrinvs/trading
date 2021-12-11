import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from "@angular/core";
import {TableAlignment, TableColumn} from "../../model/TableColumn";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faTrashAlt, faEdit} from "@fortawesome/free-solid-svg-icons";
import { DocumentMetadata } from "src/app/module/document/model/document.metadata";

@Component({
  selector: 'Table',
  template: `
    <table mat-table [dataSource]="dataSource" class="w-full" multiTemplateDataRows>
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
            <img *ngIf="column.sortable" (click)="sort(column)" class="cursor-pointer h-5" src="assets/icons/bx-sort.svg"/>
          </div>
        </th>
        <td
          mat-cell
          *matCellDef="let element"
          [class.!text-center]="column.cellAlign === TableAlignment.CENTER"
          [class.!text-left]="column.cellAlign === TableAlignment.LEFT"
          [class.!text-right]="column.cellAlign === TableAlignment.RIGHT"
          (click)="onCellClick(element, column)"
        >
          <div *ngIf="isArray(element[column.id])">
            <span class="tag badge badge-primary mr-1" *ngFor="let el of element[column.id]">{{el}}</span>
          </div>
          <div *ngIf="isUrl(element[column.id])">
            <a [href]="element[column.id]" target="_blank">{{element[column.id]}}</a>
          </div>
          <div *ngIf="isText(element[column.id])">
            <span *ngIf="!column.bold">{{element[column.id]}}</span>
            <strong *ngIf="column.bold === true">{{element[column.id]}}</strong>
          </div>
        </td>
      </ng-container>

      <ng-container matColumnDef="bookmark">
        <th
          mat-header-cell
          *matHeaderCellDef
          [width]="50"
        >
        </th>
        <td mat-cell *matCellDef="let element" class="text-center">
          <img (click)="bookmarkClick(element)" [src]="getBookmarkSrc(element)"/>
        </td>
      </ng-container>

      <ng-container matColumnDef="action">
        <th
          mat-header-cell
          *matHeaderCellDef
          [width]="80"
        >
        </th>
        <td
          mat-cell
          *matCellDef="let element"
        >
          <ng-container *ngIf="actionTemplate">
            <ng-container  *ngTemplateOutlet="actionTemplate;context: {data: element}">

            </ng-container>
          </ng-container>
        </td>
      </ng-container>

      <ng-container matColumnDef="expandedDetail">
        <td mat-cell *matCellDef="let element" [attr.colspan]="columns.length + 1">
          <div class="row secondary-row" [@detailExpand]="'expanded'" *ngIf="expandable" [innerHTML]="element[expandAttr]">

          </div>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayColumns; sticky: true"></tr>
      <tr mat-row *matRowDef="let row; columns: displayColumns;" [class.in-search]="inSearchMode"
          (click)="rowClick(row)"
      ></tr>

      <tr class="mat-row" *matNoDataRow>
        <td class="mat-cell" colspan="9999">
          Không có dữ liệu
        </td>
      </tr>

      <tr mat-row *matRowDef="let row1; columns: ['expandedDetail']" class="expanded-row" [class.hidden]="!expandable"></tr>
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
  styleUrls: ["./table.component.scss"],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit, OnChanges {

  @Input() columns: TableColumn[] = [];
  @Input() dataSource: any[] = [];
  @Input() sizeOptions: number[] = [];
  @Input() totalItems: number = 0;
  @Input() page: number = 1;
  @Input() pagination: boolean = true;
  @Input() size: number = 20;
  @Input() expandable: boolean = false;
  @Input() expandAttr: string = "";
  @Input() inSearchMode: boolean = false;
  @Input() action: boolean = true;
  @Input() bookmark: boolean = false;

  @ContentChild(TemplateRef) actionTemplate: TemplateRef<any> | undefined;

  @Output() sizeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() rowClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() bookmarkClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() sorted: EventEmitter<any> = new EventEmitter<any>();

  displayColumns: string[] = [];

  faTrash: IconDefinition = faTrashAlt;
  faEdit: IconDefinition = faEdit;

  sortBy: string = "docidx";
  sortDirection: string = "desc";

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.columns) {
        this.displayColumns = (changes.columns.currentValue as TableColumn[])
          .filter(x => x.active)
          .map(x => x.id);

        if (this.bookmark) {
          this.displayColumns.unshift("bookmark");
        }

        if (this.action) {
          this.displayColumns.push("action");
        }
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

  onCellClick(element: any, column: TableColumn) {
    if (column.clickFn) {
      column.clickFn(element);
    }
  }

  bookmarkClick(element: any) {
    this.bookmarkClicked.emit(element);
  }

  getBookmarkSrc(element: any): string {
    if (element.bookmarked) {
      return "assets/icons/primary/bxs-star.svg";
    }

    return "assets/icons/gray/bxs-star.svg";
  }

  isArray(val: any) {
    return Array.isArray(val);
  }

  isUrl(val: any) {
    return (typeof val === "string") && (val.startsWith("http://") || val.startsWith("https://"));
  }

  isText(val: any) {
    return !this.isArray(val) && !this.isUrl(val);
  }

  sort(column: TableColumn): void {
    if (column.id === this.sortDirection) {
      this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortDirection = "desc";
      this.sortBy = column.id;
    }
    this.sorted.emit({
      sortBy: this.sortBy,
      sortDirection: this.sortDirection
    });
  }
}

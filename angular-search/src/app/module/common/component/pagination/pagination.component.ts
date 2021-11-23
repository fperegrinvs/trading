import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";

@Component({
  selector: 'Pagination',
  template: `
    <div class="adm-pagination">
        <span>{{currentItem + 1}}-{{currentItem + size}} trong tổng {{totalItems}}</span>
        <div>
          <span>Số dòng mỗi trang: </span>
          <select [(ngModel)]="size" (change)="onSizeChanged()">
            <option [value]="size" *ngFor="let size of sizeOptions">{{size}}</option>
          </select>
          <ngb-pagination
            [(page)]="page"
            [pageSize]="size"
            [collectionSize]="totalItems" size="sm"
            [maxSize]="5"
            (pageChange)="onPageChanged($event)"
          ></ngb-pagination>
        </div>
    </div>
  `,
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() totalItems: number = 0;
  @Input() sizeOptions: number[] = [5];
  @Input() page: number = 1;
  @Input() size: number = 5;
  currentItem: number = 0;

  @Output() sizeChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(

  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.page) {
      this.calculateShowingItems();
    }
  }

  private calculateShowingItems(): void {
    this.currentItem = ((this.page - 1) * this.size);
  }

  onSizeChanged(): void {
    this.sizeChanged.emit(this.size);
    this.calculateShowingItems();
  }

  onPageChanged($event: number): void {
    this.pageChanged.emit($event);
    this.calculateShowingItems();
  }
}

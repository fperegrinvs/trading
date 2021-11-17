import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'Pagination',
  template: `
    <div class="adm-pagination">
        <span>80-90 trong tổng 100</span>
        <div>
          <span>Số dòng mỗi trang: </span>
          <select>
            <option value="1">10</option>
          </select>
          <ngb-pagination
            [(page)]="page"
            [pageSize]="20"
            [collectionSize]="100" size="sm"></ngb-pagination>
        </div>
    </div>
  `,
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit {

  page: number = 1;

  constructor(

  ) { }

  ngOnInit(): void {
  }
}

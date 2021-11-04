import { Component, OnInit } from '@angular/core';
import {DateRange} from "@angular/material/datepicker";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashBoardComponent implements OnInit {
  constructor() {}

  selectionData: string[] = [
    "Trình ký",
    "Lưu trữ",
    "Huỷ"
  ]

  ngOnInit() {}

  onDateRangeSelect($event: DateRange<Date>): void {
    console.log($event);
  }
}

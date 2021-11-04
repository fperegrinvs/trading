import { Component, OnInit } from '@angular/core';
import {DateRange} from "@angular/material/datepicker";
import {TreeNode} from "../../common/model/TreeModel";

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

  treeData: TreeNode[] = [
    {
      name: "Phòng ban",
      children: [
        {
          name: "Tài chính"
        },
        {
          name: "Cơ sở vật chất"
        },
        {
          name: "Kỹ thuật"
        },
        {
          name: "Tổ chức hành chính"
        }
      ]
    },
    {
      name: "Loại tài liệu",
      children: [
        {
          name: "Quyết định"
        },
        {
          name: "Công văn"
        },
        {
          name: "Đề xuất"
        },
        {
          name: "Báo cáo"
        }
      ]
    }
  ]

  ngOnInit() {}

  onDateRangeSelect($event: DateRange<Date>): void {
    console.log($event);
  }

  numberChanged($value: number[]): void {
    console.log($value);
  }

  selectionChanged($value: string[]): void {
    console.log($value);
  }

  treeItemSelected($node: TreeNode): void {
    console.log($node);
  }
}

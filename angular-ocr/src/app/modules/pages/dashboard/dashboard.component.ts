import {Component, OnInit} from '@angular/core';
import {DateRange} from "@angular/material/datepicker";
import {TreeNode} from "../../common/model/TreeModel";
import {TableAlignment, TableColumn} from "../../common/model/TableColumn";

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
          name: "Tài chính",
          count: 18
        },
        {
          name: "Cơ sở vật chất",
          count: 1123
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

  tableColumns: TableColumn[] = [
    {
      id: "document",
      text: "Tài liệu",
      headerAlign: TableAlignment.CENTER,
      cellAlign: TableAlignment.LEFT
    },
    {
      id: "signer",
      text: "Người ký",
      headerAlign: TableAlignment.CENTER,
      cellAlign: TableAlignment.LEFT
    },
    {
      id: "docType",
      text: "Loại tài liệu",
      headerAlign: TableAlignment.CENTER,
      cellAlign: TableAlignment.LEFT
    },
    {
      id: "department",
      text: "Đơn vị ban hành",
      headerAlign: TableAlignment.CENTER,
      cellAlign: TableAlignment.LEFT
    },
    {
      id: "shortDesc",
      text: "Trích yếu",
      headerAlign: TableAlignment.CENTER,
      cellAlign: TableAlignment.LEFT
    },
    {
      id: "number",
      text: "Số hiệu",
      headerAlign: TableAlignment.CENTER,
      cellAlign: TableAlignment.LEFT
    },
    {
      id: "publishDate",
      text: "Ngày ban hành",
      headerAlign: TableAlignment.CENTER,
      cellAlign: TableAlignment.LEFT
    },
    {
      id: "label",
      text: "Nhãn",
      headerAlign: TableAlignment.CENTER,
      cellAlign: TableAlignment.LEFT
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

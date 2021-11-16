import { Component, OnInit } from '@angular/core';
import {TreeNode} from "../../module/common/model/TreeModel";
import {TableAlignment, TableColumn} from "../../module/common/model/TableColumn";
import {DocumentSearchService} from "../../module/document/service/document.search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  selectionData: string[] = [
    "Trình ký",
    "Lưu trữ",
    "Huỷ"
  ]

  treeData: TreeNode[] = [
    {
      name: "Người ký",
      children: [
        {
          name: "Ngô Tuấn Khoa",
          active: false
        },
        {
          name: "Vũ Đình Hồng",
          active: false
        },
        {
          name: "Lê Anh Cường",
          active: false
        }
      ],
    },
    {
      name: "Đơn vị ban hành",
      children: [],
    },
    {
      name: "Nơi nhận",
      children: [],
    },
    {
      name: "Trạng thái",
      children: [],
    }
  ];

  tableColumns: TableColumn[] = [
    {
      id: "document",
      text: "Văn bản",
      sortable: true,
      headerAlign: TableAlignment.LEFT,
      cellAlign: TableAlignment.LEFT
    },
    {
      id: "signer",
      text: "Người ký",
      sortable: true,
      headerAlign: TableAlignment.LEFT,
      cellAlign: TableAlignment.LEFT
    }
  ];

  constructor(
    private documentService: DocumentSearchService
  ) { }

  ngOnInit(): void {
    this.documentService.getDocProps()
      .subscribe(res => {
        console.log(res.props);
      });
  }

  onTreeFilter($event: TreeNode[]): void {
    console.log($event);
  }
}

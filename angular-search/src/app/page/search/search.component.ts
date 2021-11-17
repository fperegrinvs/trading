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

  treeData: TreeNode[] = [];

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

    this.documentService.searchDocument("", 1, 10)
      .subscribe(res => {
        console.log(res.hits);
      });

    this.documentService.getCategories()
      .subscribe(res => {
        this.treeData = res.map(x => {
          return {
            name: x.metaData,
            children: x.options.map(opt => {
              return {
                name: opt,
                active: false
              }
            })
          }
        });
      });
  }

  onTreeFilter($event: TreeNode[]): void {
    console.log($event);
  }
}

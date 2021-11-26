import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TreeNode} from "../../module/common/model/TreeModel";
import {TableAlignment, TableColumn} from "../../module/common/model/TableColumn";
import {DocumentSearchService} from "../../module/document/service/document.search.service";
import {MatDialog} from "@angular/material/dialog";
import {Statistic, StatisticOption} from "../../module/document/model/statistic";
import {StatisticModalComponent} from "./statistic.modal/statistic.modal.component";
import * as _ from "lodash";
import {Subscription} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {DocumentMetadata} from "../../module/document/model/document.metadata";
import {DatePipe} from "@angular/common";
import {DateRange} from "@angular/material/datepicker";
import {ReportTypeEnum} from "../../module/document/enum/report.type.enum";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @ViewChild("table") table: ElementRef | undefined;

  subcriptions: Subscription[] = [];

  filterOptions: any = {};
  treeData: TreeNode[] = [];
  topFilter: DocumentMetadata[] = [];
  topFilterSelections: any = {};
  treeFilterSelections: any = {};

  tableColumns: TableColumn[] = [];
  tableData: any[] = [];
  totalItems: number = 0;
  tableSize: number = 10;
  page: number = 1;

  dataProcessEngine: any = {};

  statisticOptions: StatisticOption[] = [
    {
      name: "Loại tài liệu",
      type: ReportTypeEnum.LOAI_TAI_LIEU
    },
    {
      name: "Người ký",
      type: ReportTypeEnum.NGUOI_KY
    },
    {
      name: "Nơi ban hành",
      type: ReportTypeEnum.NOI_BAN_HANH
    },
    {
      name: "Ngày ban hành",
      type: ReportTypeEnum.NGAY_BAN_HANH
    }
  ]

  searchTerm: string = "";

  leftFilterShow: boolean = true;
  topFilterShow: boolean = true;
  statisticShow: boolean = true;

  constructor(
    private documentService: DocumentSearchService,
    private dialogService: MatDialog,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  private prepareDataProcess(metaData: DocumentMetadata[]): void {
    const engine: any = {};

    metaData.forEach(meta => {
      if (meta.type === "string") {
        engine[meta.name] = (content: string) => {
          return content;
        }
      } else if (meta.type === "date") {
        engine[meta.name] = (milisStr: string) => {
          const date = new Date(+milisStr);
          return this.datePipe.transform(date, "dd/MM/yyyy");
        }
      }
    });

    this.dataProcessEngine = engine;
  }

  private prepareTableColumns(callback?: Function): void {
    this.documentService.getDocProps()
      .subscribe(res => {
        const requiredProps = res.props.filter(x => x.required);
        this.prepareDataProcess(res.props);
        this.tableColumns = requiredProps
          .filter(x => x.name !== "content")
          .map(prop => {
          const column: TableColumn = {
            id: prop.name,
            text: (prop.note || "").replace(/\(.+\)/gi, "").trim(),
            sortable: true,
            headerAlign: TableAlignment.LEFT,
            cellAlign: TableAlignment.LEFT,
            active: true
          }
          return column;
        });

        if (callback) {
          callback();
        }
      });
  }

  private prepareTableData(searchProps?: any): void {
    this.spinnerService.show("table-loader");
    this.documentService.searchDocument(this.searchTerm, this.page, this.tableSize, searchProps)
      .subscribe(res => {
        this.tableData = res.hits.map(x => {
          const item = x._source;

          Object.keys(item).forEach(key => {
            if (this.dataProcessEngine[key]) {
              item[key] = this.dataProcessEngine[key](item[key]);
            }
          });

          item.highlight = this.searchTerm ? x.highlight.content.join("<br/>") : "";

          return item;
        });

        this.totalItems = res.total_row;

        this.spinnerService.hide("table-loader");
      });
  }

  private prepareFilterOptions(): void {
    const filterOptions: any = {};
    this.documentService.searchDocument("", 1, 100)
      .subscribe(response => {
        this.documentService.getDocProps()
          .subscribe(props => {
            props.props.forEach(prop => {
              const options = [...new Set(response.hits
                .map(x => x._source[prop.name]))].slice(0, 5);

              filterOptions[prop.name] = options;
            });

            this.filterOptions = filterOptions;
            this.prepareTreeFilter(props.props);
            this.prepareTopFilter(props.props);
          });
      });
  }

  private prepareTreeFilter(props: DocumentMetadata[]): void {
    this.treeData = ["publisherName", "documentName"].map(prop => {
      const options: string[] = this.filterOptions[prop]
      const meta = props.filter(x => x.name === prop)[0];

      const node: TreeNode = {
        id: prop,
        name: this.getMetaDataName(meta),
        children: options.map(x => {
          const childNode: TreeNode = {
            name: x
          }
          return childNode;
        })
      };

      return node;
    })
  }

  private prepareTopFilter(props: DocumentMetadata[]): void {
    this.topFilter = [];
    this.documentService.getSearchProps()
      .subscribe(searchProps => {
        this.topFilter = searchProps.items;
      });
  }

  private resetFilter(): void {
    this.treeData.forEach(node => {
      node.children?.forEach(child => child.active = false);
    });
  }

  ngOnInit(): void {
    this.prepareTableColumns(() => {
      this.prepareTableData();
    });

    const onSearchSubscription = this.documentService.onSearch()
      .subscribe(term => {
        this.searchTerm = term;
        this.page = 1;

        this.resetFilter();
        this.prepareTableData();
      });

    this.subcriptions.push(onSearchSubscription);
    this.prepareFilterOptions();
  }

  ngOnDestroy() {
    this.subcriptions.forEach(sub => sub.unsubscribe());
  }

  onTreeFilter($event: TreeNode[]): void {
    const searchProps: any = {};
    $event.forEach(metaData => {
      searchProps[metaData.id || ""] = metaData.children ? metaData.children[0].name : "";
    })

    this.treeFilterSelections = searchProps;
    this.prepareTableData(searchProps);
  }

  openStatistic(statistic: StatisticOption): void {
    const modalData = {
      title: statistic.name,
      type: statistic.type
    };

    this.dialogService.open(StatisticModalComponent, {
      data: modalData
    });
  }

  toggleColumn(column: TableColumn): void {
    const newState = _.cloneDeep(this.tableColumns);
    newState.forEach(col => {
      if (col.id === column.id) {
        col.active = !col.active;
      }
    });

    this.tableColumns = newState;
  }

  onTableSizeChanged($event: number): void {
    this.tableSize = $event;

    this.prepareTableData();
  }

  onTablePageChanged($event: number): void {
    this.page = $event;

    this.prepareTableData();
  }

  onDocumentClicked($event: any): void {
    this.documentService.selectDocument($event);
    this.router.navigate(["app", "detail"]);
  }

  getMetaDataName(meta: DocumentMetadata): string {
    return (meta.note || "").replace(/\(.+\)/gi, "").trim();
  }

  dateFilterSelect($event: DateRange<any>, meta: DocumentMetadata): void {
    if ($event.end && $event.start) {
      this.topFilterSelections[meta.name + "from"] = this.datePipe.transform($event.start, "dd/MM/yyyy");
      this.topFilterSelections[meta.name + "to"] = this.datePipe.transform($event.end, "dd/MM/yyyy")
    } else {
      delete this.topFilterSelections[meta.name + "from"];
      delete this.topFilterSelections[meta.name + "to"];
    }
  }

  selectionFilterChanged($event: string[], meta: DocumentMetadata): void {
    if ($event.length > 0) {
      this.topFilterSelections[meta.name] = $event[0];
    } else {
      delete this.topFilterSelections[meta.name];
    }
  }

  triggerFilter(): void {
    const filterValue = {
      ...this.topFilterSelections,
      ...this.treeFilterSelections
    }
    this.prepareTableData(filterValue);
  }

  toggleCard($event: MouseEvent, card: string): void {
    $event.stopPropagation();
    switch (card) {
      case "leftFilter":
        this.leftFilterShow = !this.leftFilterShow;
        break;
      case "topFilter":
        this.topFilterShow = !this.topFilterShow;
        break;
      case "statistic":
        this.statisticShow = !this.statisticShow;
        break;
    }
  }

  hideLeftBar(): void {
    this.leftFilterShow = false;
  }

  hideTopBar(): void {
    this.topFilterShow = false;
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DocumentSearchService} from "../../module/document/service/document.search.service";
import {TableAlignment, TableColumn} from "../../module/common/model/TableColumn";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {Document} from "../../module/document/model/document";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import { faEdit, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { TagsModalComponent } from './tags.modal/tags.modal.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  tableColumns: TableColumn[] = [
    {
      id: "metadata",
      text: "Metadata",
      sortable: false,
      headerAlign: TableAlignment.LEFT,
      cellAlign: TableAlignment.LEFT,
      active: true,
      bold: true
    },
    {
      id: "content",
      text: "Nội dung",
      sortable: false,
      headerAlign: TableAlignment.LEFT,
      cellAlign: TableAlignment.LEFT,
      active: true
    }
  ];
  dataSource: any[] = [];

  relativeColumns: TableColumn[] = [];
  relativeData: any[] = [];
  document: any = {};
  faEdit: IconDefinition = faEdit;

  constructor(
    private documentService: DocumentSearchService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: MatDialog
  ) { }

  private loadDocument(): void {
    const source: any[] = [];

    this.documentService.getDocProps()
      .subscribe(props => {
        this.document = this.documentService.getCurrentDocument();

        props.props.forEach(prop => {
          if (this.document[prop.name] && prop.note) {
            source.push({
              metadata: prop.note?.replace(/\(.+\)/gi, "").trim(),
              content: this.document[prop.name],
              editable: prop.name === "tags"
            });
          }
        });

        if (!this.document.tags) {
          source.push({
            metadata: "Nhãn",
            content: [],
            editable: true
          })
        }

        this.dataSource = source;
      });

    this.prepareTableColumns();
    this.prepareTableData();
  }

  ngOnInit(): void {
    if (this.documentService.getCurrentDocument()) {
      this.loadDocument();
    } else {
      this.backToSearch();
    }

    const onDocumentSelected = this.documentService.onDocumentSelected()
      .subscribe(doc => {
        this.spinner.show("detail-spinner");
        this.loadDocument();
        setTimeout(() => {
          this.spinner.hide("detail-spinner");
          window.scroll(0,0);
        }, 500);
      });

    this.subscriptions.push(onDocumentSelected);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  backToSearch(): void {
    this.router.navigate(["app", "search"]);
  }

  private prepareTableColumns(): void {
    this.documentService.getDocProps()
      .subscribe(res => {
        const requiredProps = res.props.filter(x => x.required);
        this.relativeColumns = requiredProps
          .filter(x => x.name !== "content")
          .map(prop => {
            const column: TableColumn = {
              id: prop.name,
              text: (prop.note || "").replace(/\(.+\)/gi, "").trim(),
              sortable: false,
              headerAlign: TableAlignment.LEFT,
              cellAlign: TableAlignment.LEFT,
              active: true
            }
            return column;
          })
      });
  }

  private prepareTableData(): void {
    this.documentService.searchDocument(false, "", 1, 10)
      .subscribe(res => {
        this.relativeData = res.hits.map(x => x._source);
      });
  }

  relateClicked($event: any): void {
    this.documentService.selectDocument($event);
  }

  getFileName(url: string): string {
    const parts = url.split("/");
    return parts.length > 0 ? parts[parts.length - 1] : url;
  }

  downloadFile(url: string): void {
    window.open(url, "_blank");
  }

  onEditClick(data: any): void {
    this.modalService.open(TagsModalComponent, {
      data: {
        document: this.document
      }
    });
  }
}

import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {DocumentSearchService} from "../../module/document/service/document.search.service";
import {TableAlignment, TableColumn} from "../../module/common/model/TableColumn";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {Document} from "../../module/document/model/document";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import { faEdit, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { TagsModalComponent } from './tags.modal/tags.modal.component';
import Swal from 'sweetalert2';
import { DocumentProcessService } from 'src/app/module/document/service/document.process.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  @ViewChild("contentHtml") contentHtml: ElementRef | undefined;

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
  permissions: any = {}
  fromPage: string = "";
  showContentHtml: boolean = false;
  htmlPageCount: number = 0;

  constructor(
    private documentService: DocumentSearchService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: MatDialog,
    private route: ActivatedRoute,
    private documentProcessService: DocumentProcessService
  ) { }

  private loadDocument(doc: Document): void {
    const source: any[] = [];

    this.documentService.getDocProps()
      .subscribe(props => {
        this.document = doc;
        this.htmlPageCount = this.document.content_html ? Object.keys(this.document.content_html).length : 0;
        props.props.forEach(prop => {
          if (this.document[prop.name] && prop.note && prop.show_in_detail) {
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
    this.route.params
      .subscribe(res => {
        this.documentService.getDocumentById(res.docId)
          .subscribe((res: any) => {
            this.loadDocument(res._source);
            this.permissions = res.permissions;
          });
      });

      this.route.queryParams.subscribe(res => {
        if (res.from) {
          this.fromPage = res.from;
        }
      });

    const onDocumentSelected = this.documentService.onDocumentSelected()
      .subscribe(doc => {
        this.spinner.show("detail-spinner");
        this.loadDocument(doc);
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
    console.log(this.fromPage);
    if (this.fromPage === "search") {
      this.router.navigate(["app", "search"]);
    } else {
      this.router.navigate(["app", "mydoc"]);
    }
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

  deleteDocument(): void {
    Swal.fire({
      title: "Xác nhận xoá tài liệu?",
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.documentProcessService.deleteDocument(this.document.docidx)
          .subscribe(response => {
            if (response.isvalid) {
              this.backToSearch();
            }
          })
      }
    });
  }

  toggleHtml($event: boolean): void {
    this.showContentHtml = !this.showContentHtml;
    const doc = this.contentHtml?.nativeElement.contentWindow.document;
    doc.open();
    doc.write(this.document.content_html[0]);
    doc.close();
  }

  htmlPageChanged($event: any): void {
    const page = +$event - 1;
    const doc = this.contentHtml?.nativeElement.contentWindow.document;
    doc.open();
    doc.write(this.document.content_html[page]);
    doc.close();
  }
}

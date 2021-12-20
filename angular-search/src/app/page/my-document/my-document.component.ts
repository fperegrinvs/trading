import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { DocformComponent } from 'src/app/component/docform/docform.component';
import { TableAlignment, TableColumn } from 'src/app/module/common/model/TableColumn';
import { DocumentStatus } from 'src/app/module/document/enum/document.status.enum';
import { DocumentSearchService } from 'src/app/module/document/service/document.search.service';
import { UIService } from 'src/app/service/ui.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { DocumentProcessService } from 'src/app/module/document/service/document.process.service';
import { Router } from '@angular/router';
import { isNumber } from 'lodash';

@Component({
  selector: 'app-my-document',
  templateUrl: './my-document.component.html',
  styleUrls: ['./my-document.component.scss']
})
export class MyDocumentComponent implements OnInit {

  faTrash: IconDefinition = faTrashAlt;

  documentCount: any = {
    total: 0,
    new: 0,
    approved: 0,
    rejected: 0
  }

  clickFn = (data: any) => {
    this.router.navigate(["/app", "detail", data.docidx], {
      queryParams: {
        "from": "mydoc"
      }
    });
  }

  tableColumns: TableColumn[] = [
    {
      id: "signNumber",
      text: "Số hiệu",
      headerAlign: TableAlignment.LEFT,
      cellAlign: TableAlignment.LEFT,
      active: true,
      clickFn: this.clickFn
    },
    {
      id: "subject",
      text: "Trích yếu",
      headerAlign: TableAlignment.LEFT,
      cellAlign: TableAlignment.LEFT,
      active: true,
      clickFn: this.clickFn
    },
    {
      id: "updateTime",
      text: "Thời gian cập nhật",
      headerAlign: TableAlignment.LEFT,
      cellAlign: TableAlignment.LEFT,
      active: true,
      clickFn: this.clickFn
    },
    {
      id: "status",
      text: "Trạng thái",
      headerAlign: TableAlignment.LEFT,
      cellAlign: TableAlignment.LEFT,
      active: true
    }
  ]

  data: any[] = [];

  settings: any = {
    new: true,
    approved: false,
    rejected: false
  };

  filters: number[] = [0];

  constructor(
    private documentService: DocumentSearchService,
    private uiService: UIService,
    private datePipe: DatePipe,
    private documentProcessService: DocumentProcessService,
    private router: Router
  ) { }

  private fetchDocuments(filters: number[]) {
    const params = new HttpParams()
      .set("filters", filters.join(","));

    this.documentService.getMyDocuments(params)
    .subscribe(res => {
      this.data = res.map(x => {
        const item = x._source;
        if (item.statusNum === DocumentStatus.WAITING) {
          item.status = [{
            text: "Chờ duyệt",
            type: "warning"
          }];
        } else if (item.statusNum === DocumentStatus.APPROVED) {
          item.status = [{
            text: "Đã duyệt",
            type: "success"
          }];
        } else if (item.statusNum === DocumentStatus.REJECTED) {
          item.status = [{
            text: "Từ chối",
            type: "danger"
          }];
        }

        if (item.updateTime && isNumber(item.updateTime)) {
          item.updateTime = this.datePipe.transform(new Date(item.updateTime), "dd/MM/yyyy HH:mm");
        }

        return item;
      });
    });

  }

  ngOnInit(): void {
    this.fetchDocuments(this.filters);
    this.documentService.countMyDocuments()
      .subscribe(res => {
        this.documentCount = res;
      });
  }

  settingChanged(filter: string): void {
    const filters = [];
    this.settings[filter] = !this.settings[filter];

    if (this.settings.new) {
      filters.push(DocumentStatus.NEW);
    }

    if (this.settings.approved) {
      filters.push(DocumentStatus.APPROVED);
    }

    if (this.settings.rejected) {
      filters.push(DocumentStatus.REJECTED);
    }

    this.filters = filters;

    this.fetchDocuments(this.filters);
  }

  get DocumentStatus() {
    return DocumentStatus;
  }

  deleteDocument(data: any): void {
    Swal.fire({
      title: "Xác nhận xoá tài liệu?",
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.documentProcessService.deleteDocument(data.docidx)
          .subscribe(response => {
            if (response.isvalid) {
              this.fetchDocuments(this.filters);
            }
          })
      }
    });
  }
}

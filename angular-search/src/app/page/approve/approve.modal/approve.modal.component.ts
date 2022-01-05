import { DatePipe } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DocformComponent } from 'src/app/component/docform/docform.component';
import { TableAlignment, TableColumn } from 'src/app/module/common/model/TableColumn';
import { DocumentMetadata } from 'src/app/module/document/model/document.metadata';
import { DocumentProcessService } from 'src/app/module/document/service/document.process.service';
import { DocumentSearchService } from 'src/app/module/document/service/document.search.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-approve.modal',
  templateUrl: './approve.modal.component.html',
  styleUrls: ['./approve.modal.component.scss']
})
export class ApproveModalComponent implements OnInit {

  @ViewChild("docForm") docForm: DocformComponent | undefined;

  doc: any = {};
  meta: DocumentMetadata[] = [];
  requiredProps: DocumentMetadata[] = [];
  metaChunks: DocumentMetadata[][] = [];
  tableColumns: TableColumn[] = [];
  tableData: any[] = [];
  validation: string[] = [];

  currentStepIndex: number = -1;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private documentService: DocumentSearchService,
    private datePipe: DatePipe,
    private documentProcessService: DocumentProcessService,
    private dialogService: MatDialog,
    private dialogRef: MatDialogRef<ApproveModalComponent>,
    private router: Router
  ) {

  }

  private prepareMetaData(): void {
    this.documentService.getDocProps()
      .subscribe(res => {
        if (res.isvalid) {
          this.meta = res.props.filter(prop => {
            if (prop.note) {
              prop.note = prop.note.replace(/\(.+\)/gi, "").trim();
            } else {
              return false;
            }

            if (!prop.show_in_form) {
              return false;
            }

            if (prop.required && prop.name !== "content") {
              this.requiredProps.push(prop);
              return true;
            }

            if (this.doc[prop.name] && prop.name !== "content") {
              return true;
            }

            return false;
          });

          this.doc = this.processMetaResponse(this.doc);
        }
      })
  }

  private prepareRelatedDocuments(): void {
    this.documentService.searchDocument(false, "", 1, 10, undefined, undefined, {
      signNumber: this.doc.signNumber
    }).subscribe(res => {
      this.tableData = res.hits.map(x => x._source);
    });
  }

  private prepareTableColumns(): void {
    this.documentService.getDocProps()
      .subscribe(res => {
        this.tableColumns = res.props.filter(x => x.name === "signNumber" || x.name === "subject")
          .map(x => {
            const column: TableColumn = {
              id: x.name,
              text: x.note ? x.note?.replace(/\(.+\)/gi, "").trim() : "",
              headerAlign: TableAlignment.LEFT,
              cellAlign: TableAlignment.LEFT,
              active: true
            };

            return column;
          });
      });
  }

  private processMetaResponse(data: any): any {
    this.meta.forEach(prop => {
      if (!data[prop.name]) {
        data[prop.name] = "";
      } else if (prop.type === "date") {
        data[prop.name] = this.datePipe.transform(new Date(+data[prop.name]), "yyyy-MM-ddThh:mm");
      }
    })
    return data;
  }

  ngOnInit(): void {
    this.doc = this.data.doc;

    this.prepareMetaData();
    this.prepareTableColumns();
    this.prepareRelatedDocuments();

    this.doc.doc_flows.forEach((el: any, idx: number) => {
      if (!el.flag && this.currentStepIndex < 0) {
        this.currentStepIndex = idx;
      }
    })
  }

  private validateDocumentMeta(doc: any): boolean {
    this.validation = [];
    this.requiredProps.forEach(prop => {
      if (!doc[prop.name]) {
        this.validation.push(`${prop.note} là thông tin bắt buộc`);
      }
    });

    return this.validation.length === 0;
  }

  processUploadMeta(obj: any): void {
    this.meta.forEach(prop => {
      if (obj[prop.name]) {
        switch (prop.type) {
          case "date":
            obj[prop.name] = this.datePipe.transform(new Date(obj[prop.name]), "dd/MM/yyyy");
            break;
          default:
            break;
        }
      }
    });
  }

  approve(): void {
    if (this.docForm) {
      if (this.validateDocumentMeta(this.docForm.getFormData())) {
        Swal.fire({
          title: "Xác nhận duyệt tài liệu?",
          input: 'text',
          inputLabel: "Tin nhắn phản hồi",
          inputPlaceholder: "Không bắt buộc",
          showCancelButton: true
        }).then(res => {
          if (res.isConfirmed) {
            const document = this.docForm?.getFormData();
            const docId = document.docidx ? document.docidx : document.file;
            this.processUploadMeta(document);
            this.documentProcessService.updateDocument(document)
              .subscribe(updateRes => {
                if (updateRes.isvalid) {
                  this.documentService.approveDocument(docId, res.value)
                  .subscribe(approveRes => {
                    this.dialogRef.close({refresh: true});
                  });
                }
              })
          }
        })
      }
    }
  }

  reject(): void {
    if (this.docForm) {
      Swal.fire({
        title: "Xác nhận từ chối tài liệu?",
        input: "text",
        inputLabel: "Lý do từ chối",
        inputPlaceholder: "Bắt buộc",
        inputValidator(inputValue: string): Promise<any> {
          return new Promise(resolve => {
            if (!inputValue) {
              resolve("Vui lòng nhập lý do từ chối")
            } else {
              resolve(null);
            }
          });
        },
        showCancelButton: true
      }).then(res => {
        if (res.isConfirmed) {
          const document = this.docForm?.getFormData();
          const docId = document.docidx ? document.docidx : document.file;
          this.documentService.rejectDocument(docId, res.value)
            .subscribe(res => {
              if (res) {
                this.dialogRef.close({refresh: true});
              }
            })
        }
      })
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  downloadAttachment(docId: number, file: any): void {
    const url = this.documentProcessService.fetchDownloadLink(docId, file);
    window.open(url, "_blank");
  }

  goToDocument(doc: any): void {
    const docId = doc.docidx ? doc.docidx : doc.file;
    const url = this.router.serializeUrl(this.router.createUrlTree(['/app/detail', docId]));
    window.open(url, '_blank');
  }
}

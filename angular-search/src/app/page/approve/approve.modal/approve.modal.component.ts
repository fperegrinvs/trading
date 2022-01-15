import { DatePipe } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {forkJoin, Observable, Subject} from 'rxjs';
import { DocformComponent } from 'src/app/component/docform/docform.component';
import { TableAlignment, TableColumn } from 'src/app/module/common/model/TableColumn';
import { DocumentMetadata } from 'src/app/module/document/model/document.metadata';
import { DocumentProcessService } from 'src/app/module/document/service/document.process.service';
import { DocumentSearchService } from 'src/app/module/document/service/document.search.service';
import Swal from "sweetalert2";
import {ContentDisplayType} from "../../detail/detail.component.model";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import {Attachment} from "../../../module/document/model/attachment";
import {DocumentAttachmentService} from "../../../module/document/service/document.attachment.service";

@Component({
  selector: 'app-approve.modal',
  templateUrl: './approve.modal.component.html',
  styleUrls: ['./approve.modal.component.scss']
})
export class ApproveModalComponent implements OnInit {

@ViewChild("docForm") docForm: DocformComponent | undefined;
@ViewChild("contentHtml") contentHtml: ElementRef | undefined;
@ViewChild("documentImage") documentImage: ElementRef | undefined;

doc: any = {};
meta: DocumentMetadata[] = [];
requiredProps: DocumentMetadata[] = [];
metaChunks: DocumentMetadata[][] = [];
tableColumns: TableColumn[] = [];
tableData: any[] = [];
validation: string[] = [];

currentStepIndex: number = -1;
displayType: string = "";

htmlPageCount: number = 0;
imagePageCount: number = 0;

docId: string = "";

faFile: IconDefinition = faFile;
files: File[] = [];

constructor(
  @Inject(MAT_DIALOG_DATA) private data: any,
  private documentService: DocumentSearchService,
  private datePipe: DatePipe,
  private documentProcessService: DocumentProcessService,
  private dialogService: MatDialog,
  private dialogRef: MatDialogRef<ApproveModalComponent>,
  private router: Router,
  private attachmentService: DocumentAttachmentService
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
  if (!this.doc.attachments) {
  this.doc.attachments = [];
}
this.htmlPageCount = this.doc.content_html ? Object.keys(this.doc.content_html).length : 0;
this.imagePageCount = this.doc.pages ? this.doc.pages.length : 0;
this.docId = this.doc.docidx ? this.doc.docidx : this.doc.file;

if (this.doc.pages && this.doc.pages.length > 0) {
  this.displayType = ContentDisplayType.ORIGINAL;
  this.buildContentImageUrl(this.docId, 0);
} else {
  this.displayType = ContentDisplayType.TEXT
}

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

deleteAttachment(docId: string, file:any): void {
  Swal.fire({
    title: "Xác nhận xoá tập tin đính kèm?",
    text: file.downname,
    showCancelButton: true,
    icon: "question"
  }).then(prompt => {
    if (prompt.isConfirmed) {
      this.attachmentService.deleteAttachment(docId, file)
        .subscribe(res => {
          if (res) {
            this.resetDocAttachments();
          }
        })
    }
  });
}

goToDocument(doc: any): void {
  const docId = doc.docidx ? doc.docidx : doc.file;
  const url = this.router.serializeUrl(this.router.createUrlTree(['/app/detail', docId]));
  window.open(url, '_blank');
}

get ContentDisplayType() {
  return ContentDisplayType;
}

private buildContentImageUrl(docId: string, page: number): void {
  this.documentService.getDocumentImage(docId, page)
    .subscribe(res => {
      this.documentImage!.nativeElement.src = URL.createObjectURL(res);
    });
}

imagePageChanged($event: any): void {
  const page = +$event - 1;
  this.buildContentImageUrl(this.docId, page);
}

displayChanged(): void {
  if (this.displayType === ContentDisplayType.ORIGINAL) {
  this.buildContentImageUrl(this.docId, 0);
} else if (this.displayType === ContentDisplayType.HTML) {
  this.toggleHtml(0);
}
}

toggleHtml(page: number): void {
  const doc = this.contentHtml?.nativeElement.contentWindow.document;
  doc.open();
  doc.write(this.doc.content_html[page]);
  doc.close();
}

htmlPageChanged($event: any): void {
  const page = +$event - 1;
  this.toggleHtml(page);
}

onRemove($event: any) {
  const idx = this.files.indexOf($event);
  this.files.splice(idx, 1);
}

private getBase64(file: File): Promise<string> {
  return new Promise<string>((resolve => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve((reader.result as string)?.replace(/^.+;base64,/gi, ""));
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }));
}

onSelect($event: any) {
  $event.addedFiles.forEach((file: File) => {
    this.files.push(file);
  });
}

private resetDocAttachments(): void {
  this.documentService.getDocumentById(this.docId)
    .subscribe(doc => {
      this.doc.attachments = doc._source.attachments;
    });
}

uploadAttachments(): void {
  console.log(this.files);
  const obs: Promise<string>[] = [];
this.files.forEach(file => {
  obs.push(this.getBase64(file));
});

const attachments: Attachment[] = [];

Promise.all(obs)
  .then(res => {
    res.forEach((base64, idx) => {
      const nameParts = this.files[idx].name.split(".");
      attachments.push({
        downname: this.files[idx].name,
        data: base64,
        type: nameParts[nameParts.length - 1]
      });
    });

    this.attachmentService.addAttachments(this.docId, attachments)
      .subscribe(res => {
        if (res) {
          this.resetDocAttachments();
        }
      });

    this.files = [];
  });
}
}

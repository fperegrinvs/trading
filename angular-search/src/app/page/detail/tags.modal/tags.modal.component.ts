import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentProcessService } from 'src/app/module/document/service/document.process.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-tags.modal',
  templateUrl: './tags.modal.component.html',
  styleUrls: ['./tags.modal.component.scss']
})
export class TagsModalComponent implements OnInit {

  document: any = {}

  readonly tagSeparators = [ENTER, COMMA] as const;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<TagsModalComponent>,
    private documentProcessService: DocumentProcessService
  ) { 
  }

  ngOnInit(): void {
    this.document = this.data.document;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  remove(tag: string): void {
    Swal.fire({
      html: `Xác nhận xoá nhãn <strong>${tag}</strong>?`,
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.documentProcessService.deleteDocumentTag(this.document.docidx, [tag])
          .subscribe(res => {
            if (res) {
              const index = this.document.tags.indexOf(tag);
              this.document.tags.splice(index, 1);
            }
          })
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (!this.document.tags) {
      this.document.tags = [];
    }

    // Add our fruit
    if (value) {
      const currentIndex = this.document.tags.indexOf(value);
      if (currentIndex >= 0) {
        // duplicated
        Swal.fire({
          icon: "warning",
          html: `Nhãn <strong>${value}</strong> đã tồn tại`
        });
      }

      this.documentProcessService.addDocumentTag(this.document.docidx, [value])
        .subscribe(success => {
          if (success) {
            // Clear the input value
            this.document.tags.push(value);
            event.chipInput!.clear();
          }
        })
    }
  }
}

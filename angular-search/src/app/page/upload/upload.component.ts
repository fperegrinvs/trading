import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import {DocumentSearchService} from "../../module/document/service/document.search.service";
import {DocumentProcessService} from "../../module/document/service/document.process.service";
import {DocumentMetadata} from "../../module/document/model/document.metadata";
import {DatePipe} from "@angular/common";
import Swal from 'sweetalert2';
import { forkJoin, Observable } from 'rxjs';
import { UIService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  files: File[] = [];
  metaTracking: any = {};
  metaList: any[] = [];
  faFile: IconDefinition = faFile;
  requiredProps: DocumentMetadata[][] = [];
  allProps: DocumentMetadata[] = [];
  validationTracking: string[]= [];

  @ViewChild("step2") step2El: ElementRef | undefined;

  constructor(
    private documentService: DocumentSearchService,
    private documentProcessService: DocumentProcessService,
    private datePipe: DatePipe,
    private uiService: UIService
  ) { }

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

  ngOnInit(): void {
    this.documentService.getDocProps()
      .subscribe(res => {
        this.requiredProps = [];
        const required = res.props.filter(x => x.required && x.name !== "content")
          .map(prop => {
            prop.note = prop.note?.replace(/\(.+\)/gi, "").trim();
            return prop;
          });
        this.allProps = required;
        for (let i = 0; i < required.length; i += 2) {
          const chunk = [];
          chunk.push(required[i]);
          if (required.length > (i + 1)) {
            chunk.push(required[i + 1]);
          }

          this.requiredProps.push(chunk);
        }
      });
  }

  private processMetaResponse(data: any): any {
    this.allProps.forEach(prop => {
      if (!data[prop.name]) {
        data[prop.name] = "";
      } else if (prop.type === "date") {
        data[prop.name] = this.datePipe.transform(new Date(+data[prop.name]), "yyyy-MM-ddThh:mm");
      }
    })
    return data;
  }

  private mergeMeta(): void {
    this.metaTracking = {};
    this.metaList.forEach(meta => {
      this.allProps.forEach(prop => {
        if (meta[prop.name]) {
          this.metaTracking[prop.name] = meta[prop.name]
        }
      });

      if (meta.content) {
        if (!this.metaTracking.content) {
          this.metaTracking.content = meta.content;
        } else {
          this.metaTracking.content += `\n-------------------------------- \n${meta.content}`;
        }
      }
    });
  }

  onSelect($event: any) {
    const pros : Promise<string>[] = [];
    $event.addedFiles.forEach((file: File) => {
      this.files.push(file);
      pros.push(this.getBase64(file));
    });

    const obs : Observable<any>[] = [];

    Promise.all(pros)
      .then(res => {
        res.forEach((base64, idx) => {
          obs.push(this.documentProcessService.extractMetaData($event.addedFiles[idx].name, base64));
        });

        forkJoin(obs)
        .subscribe(metas => {
          metas.filter(x => x.isvalid).map(x => this.processMetaResponse(x.doc))
            .forEach(meta => {
              this.metaList.push(meta);
            });
          this.mergeMeta();
        });
      });
  }

  private clearDataIndex(idx: number): void {
    this.files.splice(idx, 1);
    this.metaList.splice(idx, 1);
  }

  onRemove($event: any) {
    const idx = this.files.indexOf($event);
    this.clearDataIndex(idx);
    this.mergeMeta();
  }

  processUploadMeta(obj: any): void {
    this.allProps.forEach(prop => {
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

  getContent(): string {
    if (!this.metaTracking || !this.metaTracking.content) {
      return "";
    }

    return this.metaTracking.content;
  }

  private validateDocumentMeta(): boolean {
    this.allProps.forEach(prop => {
      if (!this.metaTracking[prop.name]) {
        this.validationTracking.push(`${prop.note} là thông tin bắt buộc`);
      }
    });

    if (this.validationTracking.length > 0) {
      this.step2El?.nativeElement.scrollIntoView({behavior: 'smooth'});
      return false;
    }

    return true;
  }

  private reset(): void {
    this.metaTracking = {};
    this.files = [];
    this.validationTracking = [];
  }

  saveCurrentDocument(): void {
    if (this.validateDocumentMeta()) {
      // validation passed
      const pros: Promise<string>[] = [];
      this.files.forEach(file => {
        pros.push(this.getBase64(file));
      });

      Promise.all(pros)
        .then((res) => {
          const attachments = res.map((base64, idx) => {
            const parts = this.files[idx].name.split(".");
            return {
              data: base64,
              type: parts[parts.length - 1],
              downname: this.files[idx].name
            }
          });

          this.processUploadMeta(this.metaTracking);
          this.documentProcessService.saveDocument(this.metaTracking, attachments)
            .subscribe(res => {
              if (res.isvalid) {
                this.reset();
                Swal.fire({
                  text: "Tải lên tài liệu thành công",
                  icon: "success"
                });
                this.uiService.updateApproveCount();
              }
            });
        });
    }
  }
}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import {DocumentSearchService} from "../../module/document/service/document.search.service";
import {DocumentProcessService} from "../../module/document/service/document.process.service";
import {DocumentMetadata} from "../../module/document/model/document.metadata";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  files: File[] = [];
  tabTracking: boolean[] = [];
  metaTracking: any[] = [];
  faFile: IconDefinition = faFile;
  requiredProps: DocumentMetadata[][] = [];
  allProps: DocumentMetadata[] = [];
  validationTracking: string[][] = [];
  currentIndex: number = 0;

  @ViewChild("step2") step2El: ElementRef | undefined;

  constructor(
    private documentService: DocumentSearchService,
    private documentProcessService: DocumentProcessService,
    private datePipe: DatePipe
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

  onSelect($event: any) {
    $event.addedFiles.forEach((file: File) => {
      const index = this.files.length;
      this.files.push(file);
      this.tabTracking.push(false);
      this.getBase64(file)
        .then(base64 => {
          this.documentProcessService.extractMetaData(file.name, base64)
            .subscribe(res => {
              this.tabTracking[index] = true;
              this.metaTracking.push(this.processMetaResponse(res.doc));
              this.validationTracking.push([]);
            })
        });
    });
  }

  onRemove($event: any) {
    this.files.splice(this.files.indexOf($event), 1);
    this.currentIndex = 0;
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

  getContent(index: number): string {
    if (!this.metaTracking[index] || !this.metaTracking[index].content) {
      return "";
    }

    return this.metaTracking[index].content;
  }

  private validateDocumentMeta(document: any): boolean {
    this.validationTracking[this.currentIndex] = [];
    this.allProps.forEach(prop => {
      if (!document[prop.name]) {
        this.validationTracking[this.currentIndex].push(`${prop.note} là thông tin bắt buộc`);
      }
    });

    if (this.validationTracking[this.currentIndex].length > 0) {
      this.step2El?.nativeElement.scrollIntoView({behavior: 'smooth'});
      return false;
    }

    return true;
  }

  saveCurrentDocument(): void {
    if (this.validateDocumentMeta(this.metaTracking[this.currentIndex])) {
      // validation passed
      this.getBase64(this.files[this.currentIndex])
        .then(base64 => {
          this.processUploadMeta(this.metaTracking[this.currentIndex]);
          const parts = this.files[this.currentIndex].name.split(".");
          this.documentProcessService.saveDocument([this.metaTracking[this.currentIndex]], [{
             data: base64,
              type: parts[parts.length - 1],
              downname: this.files[this.currentIndex].name
          }])
            .subscribe(res => {
              if (res.isvalid) {
                alert("success");
              }
            })
        });
    }
  }
}

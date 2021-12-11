import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DocumentMetadata } from 'src/app/module/document/model/document.metadata';

@Component({
  selector: 'Docform',
  templateUrl: './docform.component.html',
  styleUrls: ['./docform.component.scss']
})
export class DocformComponent implements OnInit, OnChanges {

  @Input() validation: string[] = [];
  @Input() props: DocumentMetadata[] = [];
  @Input() doc: any = {};

  chunks: DocumentMetadata[][] = [];
  hasContent: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.props) {
      this.hasContent = changes.props.currentValue.filter((x: DocumentMetadata) => x.name === "content").length > 0;
      const props = changes.props.currentValue.filter((x: DocumentMetadata) => x.name !== "content");
      for (let i = 0; i < props.length; i += 2) {
        const chunk = [];
        chunk.push(props[i]);
        if (props.length > (i + 1)) {
          chunk.push(props[i + 1]);
        }

        this.chunks.push(chunk);
      }
    }
  }

  getFormData(): any {
    return this.doc;
  }

  ngOnInit(): void {
  }

}

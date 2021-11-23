import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'Tag',
  template: `
    <div class="adm-tag">
      <span *ngIf="title" class="tag-title">{{title}}: </span>
      <span class="tag-value"><ng-content></ng-content></span>
    </div>
  `,
  styleUrls: ["./tag.component.scss"],
})
export class TagComponent implements OnInit {

  @Input() title: string = "";

  constructor(

  ) { }

  ngOnInit(): void {
  }
}

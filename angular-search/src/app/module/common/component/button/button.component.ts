import {AfterContentInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'Button',
  template: `
    <button [attr.mat-button]="!icon"
            [attr.mat-icon-button]="icon"
            class="adm-button
              px-3 py-2
              !flex justify-center items-center
              bg-gray-200
              !w-full rounded-md focus:text-gray-900 focus:outline-none"
            [class.adm-button-default]="type === 'default'"
            [class.adm-button-primary]="type === 'primary'"
            [class.adm-button-secondary]="type === 'secondary'"
            [class.adm-button-active]="type === 'active'"
            (click)="onButtonClick($event)"
    >
      <img [class.mr-1]="hasText" *ngIf="icon" src="assets/icons/{{icon}}"/>
      <div class="adm-dropdown-text-wrapper flex items-center text-left" #textWrapper>
        <ng-content></ng-content>
      </div>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, AfterContentInit {

  @Input("icon") icon: string = "";
  @Input("type") type: string = "default";

  @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @ViewChild("textWrapper", {static: true}) textWrapper: ElementRef | undefined

  hasText: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.hasText = this.textWrapper?.nativeElement.childNodes.length > 0;
  }

  onButtonClick($event: MouseEvent) {
    this.onClick.emit($event);
  }
}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from "@angular/core";
import {DropdownComponent} from "../dropdown/dropdown.component";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'SelectionFilter',
  template: `
    <Dropdown
      type="secondary"
      [text]="text"
      [icon]="icon"
      (close)="onDropDownClose($event)"
      #dropdown
      *ngIf="!isActive"
    >
      <div class="p-2" [style.min-width]="'200px'">
        <div class="selection-item" *ngFor="let selection of model">
          <mat-checkbox [(ngModel)]="selection.selected">
            {{selection.text}}
          </mat-checkbox>
        </div>

        <div class="mt-2">
          <Button *ngIf="!isActive" type="primary" class="w-full" (onClick)="onApplyClick($event)">Áp dụng</Button>
        </div>
      </div>
    </Dropdown>

    <Button *ngIf="isActive" [icon]="icon" type="active" (onClick)="resetFilter()">
      <div class="adm-dropdown-text" [style.font-size]="'10px'">
        {{text}}
        <div class="adm-dropdown-sub text-left" [style.line-height]="'7px'">
          <small>{{subText}}</small>
        </div>
      </div>

      <fa-icon class="ml-4" [icon]="faTimes"></fa-icon>
    </Button>
  `,
  styleUrls: ['./selection-filter.component.scss'],
})
export class SelectionFilterComponent implements OnInit {

  @Input() text: string;
  @Input() icon: string;
  @Input() selections: string[];

  @Output() onChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

  @ViewChild("dropdown") dropdown: DropdownComponent;

  isActive: boolean = false;
  model: any[];
  subText: string = null;

  faTimes: IconDefinition = faTimes;

  constructor() { }

  ngOnInit(): void {
    this.model = this.selections.map(selection => {
      return {
        text: selection,
        selected: false
      }
    });
  }

  onDropDownClose($event: any): void {
    console.log($event);
  }

  applyPreviewText(): void {
    const mainTextLength = this.text.length;
    const fullSubText = this.model.filter(x => x.selected).map(x => x.text).join(", ");
    this.subText = fullSubText.substr(0, mainTextLength) + "...";
  }

  resetFilter(): void {
    this.isActive = false;
    this.subText = null;
    this.model.forEach(x => x.selected = false);
  }

  onApplyClick($event: any): void {
    this.isActive = true;
    this.applyPreviewText();
    this.dropdown.closeDropdown();
    this.onChanged.emit(this.model.filter(x => x.selected).map(x => x.text));
  }
}

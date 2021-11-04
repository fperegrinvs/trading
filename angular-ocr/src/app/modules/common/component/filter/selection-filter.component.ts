import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {DropdownComponent} from "../dropdown/dropdown.component";

@Component({
  selector: 'SelectionFilter',
  template: `
    <Dropdown
      [type]="isActive ? 'active' : 'secondary'"
      [text]="text"
      [icon]="icon"
      (close)="onDropDownClose($event)"
      #dropdown
    >
      <div class="p-2" [style.min-width]="'200px'">
        <div class="selection-item" *ngFor="let selection of model">
          <mat-checkbox [(ngModel)]="selection.selected">
            {{selection.text}}
          </mat-checkbox>
        </div>

        <div class="mt-2">
          <Button *ngIf="isActive" class="w-full" (onClick)="onClearClick($event)">Xoá</Button>
          <Button *ngIf="!isActive" type="primary" class="w-full" (onClick)="onApplyClick($event)">Áp dụng</Button>
        </div>
      </div>
    </Dropdown>
  `,
  styleUrls: ['./selection-filter.component.scss'],
})
export class SelectionFilterComponent implements OnInit {

  @Input() text: string;
  @Input() icon: string;
  @Input() selections: string[];

  @ViewChild("dropdown") dropdown: DropdownComponent;

  isActive: boolean = false;
  model: any[];
  subText: string = null;

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

  resetSelections(): void {
    this.model.forEach(x => x.selected = false);
  }

  onClearClick($event: any): void {
    this.dropdown.closeDropdown();
    this.resetSelections();
    this.isActive = false;
    this.subText = null;
  }

  onApplyClick($event: any): void {
    this.isActive = true;
    this.applyPreviewText();
    this.dropdown.closeDropdown();
  }
}

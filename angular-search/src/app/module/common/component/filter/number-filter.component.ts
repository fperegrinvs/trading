import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {Options} from "@angular-slider/ngx-slider";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {DropdownComponent} from "../dropdown/dropdown.component";

@Component({
  selector: 'NumberFilter',
  template: `
    <Dropdown
      type="secondary"
      [text]="text"
      [icon]="icon"
      width="200px"
      #dropdown
      *ngIf="!isActive"
    >
      <div class="p-2 flex justify-between">
        <div class="input-wrapper text-center text-gray-400">
          <small>{{min}}</small><br/>
          <input
            [min]="min"
            [max]="max"
            [(ngModel)]="selectedRange[0]"
            type="number" class="border border-gray-300 rounded p-1 w-full text-center"
          />
        </div>
        <img src="assets/icons/bx-minus.svg" class="mt-6"/>
        <div class="input-wrapper text-center text-gray-400">
          <small>{{max}}</small><br/>
          <input
            [min]="min"
            [max]="max"
            [(ngModel)]="selectedRange[1]"
            type="number" class="border border-gray-300 rounded p-1 w-full text-center"/>
        </div>
      </div>
      <div class="adm-dropdown-foot p-2">
        <Button *ngIf="!isActive" type="primary" class="w-full" (onClick)="onApplyClick($event)">Áp dụng</Button>
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
  styleUrls: ['./number-filter.component.scss'],
})
export class NumberFilterComponent implements OnInit {

  @Input() text: string;
  @Input() icon: string;
  @Input() min: number;
  @Input() max: number;
  @Input() subText: string;

  @Output() onChanged: EventEmitter<number[]> = new EventEmitter<number[]>();

  @ViewChild("dropdown") dropdown: DropdownComponent;

  isActive: boolean = false;
  selectedRange: number[] = [3, 11]
  faTimes: IconDefinition = faTimes;

  constructor() { }

  private applyPreviewText(): void {
    this.subText = `${this.selectedRange[0]} - ${this.selectedRange[1]}`;
  }

  ngOnInit(): void {
  }

  resetFilter(): void {
    this.isActive = false;
    this.subText = null;
  }

  onApplyClick($event: MouseEvent): void {
    this.isActive = true;
    this.dropdown.closeDropdown();
    this.applyPreviewText();
    this.onChanged.emit(this.selectedRange);
  }
}

import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {DateRange} from "@angular/material/datepicker";
import {DropdownComponent} from "../dropdown/dropdown.component";
import {DatePipe} from "@angular/common";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'DateFilter',
  template: `
    <Dropdown
      [type]="'secondary'"
      [text]="text"
      [icon]="icon"
      #dropdown
      *ngIf="!isActive"
    >
      <mat-calendar
        (selectedChange)="onDateSelect($event)"
        [selected]="selectedRange"
      ></mat-calendar>

      <div class="p-2">
        <Button *ngIf="isActive" class="w-full">Xoá</Button>
        <Button *ngIf="!isActive" type="primary" class="w-full" (onClick)="onApplyClick($event)">Áp dụng</Button>
      </div>
    </Dropdown>

    <Button *ngIf="isActive" [icon]="icon" type="active" (onClick)="resetFilter()"
            matTooltip="Info about the action"
    >
      <div class="adm-dropdown-text" [style.font-size]="'10px'">
        {{text}}
        <div class="adm-dropdown-sub text-left" [style.line-height]="'7px'">
          <small>{{subText}}</small>
        </div>
      </div>

      <fa-icon class="ml-4" [icon]="faTimes"></fa-icon>
    </Button>
  `,
  styleUrls: [],
})
export class DateFilterComponent implements OnInit {

  @Input() text: string = "";
  @Input() icon: string = "";

  @Output() onSelect: EventEmitter<DateRange<any>> = new EventEmitter<DateRange<any>>();

  @ViewChild("dropdown") dropdown: DropdownComponent | undefined;

  selectedRange: DateRange<Date> = new DateRange<Date>(null, null);
  selectStep: number = 0;
  isActive: boolean = false;
  subText: string = "";

  faTimes: IconDefinition = faTimes;

  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
  }

  onDateSelect($event: Date): void {
    this.selectStep += 1;

    if (this.selectStep === 1) {
      this.selectedRange = new DateRange<Date>($event, null)
    }

    if (this.selectStep === 2) {
      this.selectedRange = new DateRange<Date>(this.selectedRange.start, $event);
      this.selectStep = 0;
    }
  }

  applyPreviewText(): void {
    const from = this.datePipe.transform(this.selectedRange.start, "dd/MM");
    const to = this.datePipe.transform(this.selectedRange.end, "dd/MM");

    this.subText = `${from} - ${to}`;
  }

  resetFilter(): void {
    this.isActive = false;
    this.selectedRange = new DateRange<Date>(null, null);
    this.subText = "";
    this.onSelect.emit(this.selectedRange);
  }

  onApplyClick($event: MouseEvent): void {
    this.onSelect.emit(this.selectedRange);
    this.dropdown?.closeDropdown();
    this.isActive = true;
    this.applyPreviewText();
  }
}

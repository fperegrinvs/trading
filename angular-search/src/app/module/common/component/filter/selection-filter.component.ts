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
        <input class="form-control mb-2" placeholder="tìm kiếm ..." (keyup)="doSearch(input.value)" #input/>
        <div class="selection-wrapper">
          <div *ngIf="model.length === 0" class="no-result">Không có kết quả</div>
          <div class="selection-item" *ngFor="let selection of model">
            <mat-checkbox [(ngModel)]="selection.selected">
              {{selection.text}}
            </mat-checkbox>
          </div>
        </div>

        <div class="mt-2">
          <Button *ngIf="!isActive" type="primary" class="w-full" (onClick)="onApplyClick($event)">Áp dụng</Button>
        </div>
      </div>
    </Dropdown>

    <Button *ngIf="isActive" [icon]="icon" type="active">
      <div class="adm-dropdown-text" [style.font-size]="'10px'">
        {{text}}
        <div class="adm-dropdown-sub text-left" [style.line-height]="'7px'">
          <small>{{subText}}</small>
        </div>
      </div>

      <fa-icon (click)="resetFilter()" class="ml-4" [icon]="faTimes"></fa-icon>
    </Button>
  `,
  styleUrls: ['./selection-filter.component.scss'],
})
export class SelectionFilterComponent implements OnInit {

  @Input() text: string = "";
  @Input() icon: string = "";
  @Input() selections: string[] = [];

  @Output() onChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

  @ViewChild("dropdown") dropdown: DropdownComponent | undefined;

  isActive: boolean = false;
  model: any[] = [];
  subText: string = "";
  originalData: any[] = [];

  faTimes: IconDefinition = faTimes;

  constructor() { }

  ngOnInit(): void {
    this.originalData = this.selections.filter(x => x).map(selection => {
      return {
        text: selection,
        selected: false
      }
    });
    this.model = this.originalData;
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
    this.subText = "";
    this.model.forEach(x => x.selected = false);
    this.onChanged.emit([]);
  }

  onApplyClick($event: any): void {
    this.isActive = true;
    this.applyPreviewText();
    this.dropdown?.closeDropdown();
    this.onChanged.emit(this.model.filter(x => x.selected).map(x => x.text));
  }

  doSearch(term: string) {
    this.model = this.originalData.filter(x => x.text && x.text.toLowerCase().includes(term.toLowerCase()));
  }
}

import {Component, Input, OnInit} from "@angular/core";
import {Options} from "@angular-slider/ngx-slider";

@Component({
  selector: 'NumberFilter',
  template: `
    <Dropdown
      [type]="isActive ? 'active' : 'secondary'"
      [text]="text"
      [icon]="icon"
      (close)="onDropDownClose($event)"
      width="200px"
    >
      <div class="p-4 flex justify-between">
        <div class="input-wrapper text-center text-gray-400">
          <small>{{min}}</small><br/>
          <input [min]="min" [max]="max" type="number" class="border border-gray-300 rounded p-1 w-full text-center"/>
        </div>
        <img src="assets/icons/bx-minus.svg" class="mt-6"/>
        <div class="input-wrapper text-center text-gray-400">
          <small>{{max}}</small><br/>
          <input [min]="min" [max]="max" type="number" class="border border-gray-300 rounded p-1 w-full text-center"/>
        </div>
      </div>
      <div class="adm-dropdown-foot p-4">
        <Button class="w-full">Clear</Button>
      </div>
    </Dropdown>
  `,
  styleUrls: ['./number-filter.component.scss'],
})
export class NumberFilterComponent implements OnInit {

  @Input() text: string;
  @Input() icon: string;
  @Input() min: number;
  @Input() max: number;

  isActive: boolean = false;
  selectedRange: number[] = [3, 11]


  constructor() { }

  ngOnInit(): void {
  }

  onDropDownClose($event: any): void {
    console.log($event);
  }

  sliderStart($event: any): void {
    console.log($event);
  }
}

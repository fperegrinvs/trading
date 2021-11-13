import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {DateRange} from "@angular/material/datepicker";
import {DropdownComponent} from "../dropdown/dropdown.component";
import {DatePipe} from "@angular/common";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'Card',
  template: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title" *ngIf="title">
          <img class="mr-2" *ngIf="icon" src="assets/icons/{{icon}}"/>
          {{title}}
        </h5>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {

  @Input() title: string = "";
  @Input() icon: string = "";

  constructor(

  ) { }

  ngOnInit(): void {
  }
}

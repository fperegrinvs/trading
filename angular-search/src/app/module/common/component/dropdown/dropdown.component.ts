import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {faCaretDown, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {MenuCloseReason} from "@angular/material/menu/menu";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'Dropdown',
  template: `
    <Button
      [icon]="icon"
      [matMenuTriggerFor]="menu"
      [type]="type"
      #dropdownTrigger="matMenuTrigger"
    >
      <div class="adm-dropdown-text">
        {{text}}
      </div>

      <fa-icon class="ml-4" *ngIf="caret" [icon]="faCaret"></fa-icon>
    </Button>

    <mat-menu #menu [class.hidden]="disable">
      <div class="adm-dropdown-content"
           (click)="$event.stopPropagation()"
           (keydown)="$event.stopPropagation()"
           [style.width]="width ? width : ''"
      >
        <ng-content></ng-content>
      </div>
    </mat-menu>
  `,
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {

  @Input("icon") icon: string = "";
  @Input("text") text: string = "";
  @Input("type") type: string = "secondary";
  @Input("caret") caret: boolean = true;
  @Input("width") width: string = "";
  @Input("disable") disable: boolean = false;

  @Output() close: EventEmitter<MenuCloseReason> = new EventEmitter<MenuCloseReason>();

  @ViewChild("dropdownTrigger") dropdownTrigger: MatMenuTrigger | undefined;

  faCaret: IconDefinition = faCaretDown;

  constructor() { }

  ngOnInit(): void {
  }

  public closeDropdown(): void {
    this.dropdownTrigger?.closeMenu();
  }
}

import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {faCaretDown, faTimes, IconDefinition} from "@fortawesome/free-solid-svg-icons";
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
      <div class="adm-dropdown-text" *ngIf="text">
        {{text}}
        <div class="adm-dropdown-sub text-left" *ngIf="subText" [style.line-height]="'7px'">
          <small>{{subText}}</small>
        </div>
      </div>

      <fa-icon class="ml-4" *ngIf="caret && !active" [icon]="faCaret"></fa-icon>
      <fa-icon (click)="dropdownClear($event)" class="ml-4" [icon]="faTimes" *ngIf="active"></fa-icon>
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
  @Input("active") active: boolean = false;
  @Input("subtext") subText: string = "";

  @Output() close: EventEmitter<MenuCloseReason> = new EventEmitter<MenuCloseReason>();
  @Output() clear: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild("dropdownTrigger") dropdownTrigger: MatMenuTrigger | undefined;

  faCaret: IconDefinition = faCaretDown;
  faTimes: IconDefinition = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

  public closeDropdown(): void {
    this.dropdownTrigger?.closeMenu();
  }

  dropdownClear($event: MouseEvent): void {
    $event.stopPropagation();
    this.clear.emit(true);
  }
}

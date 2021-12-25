import {Component, Input, OnInit, Output} from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'Toggle',
  template: `
    <mat-slide-toggle [checked]="checked" (toggleChange)="changed($event)">{{title}}</mat-slide-toggle>
  `,
  styleUrls: ["./toggle.component.scss"],
})
export class ToggleComponent implements OnInit {

  @Input() checked: boolean = false;
  @Input() title: string = "";

  @Output() onChanged: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(

  ) { }

  ngOnInit(): void {
  }

  changed($event: any): void {
    this.onChanged.emit(this.checked);
  }
}

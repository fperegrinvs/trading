import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";

@Component({
  selector: 'Checkbox',
  template: `
    <mat-checkbox [checked]="checked" (click)="$event.preventDefault()">
      {{title}}
    </mat-checkbox>
  `,
  styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent implements OnInit, OnChanges {

  @Input() checked: boolean = false;
  @Input() title: string = "";

  constructor(

  ) { }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnInit(): void {
  }
}

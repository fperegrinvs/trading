import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'Checkbox',
  template: `
    <mat-checkbox [checked]="checked"></mat-checkbox>
  `,
  styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent implements OnInit {

  @Input() checked: boolean = false;

  constructor(

  ) { }

  ngOnInit(): void {
  }
}

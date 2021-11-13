import { Component, OnInit } from '@angular/core';
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faBell} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faBell: IconDefinition = faBell;

  constructor() { }

  ngOnInit(): void {
  }

}

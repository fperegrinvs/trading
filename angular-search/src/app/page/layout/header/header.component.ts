import { Component, OnInit } from '@angular/core';
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faBell, faBars, faSearch} from "@fortawesome/free-solid-svg-icons";
import {UIService} from "../../../service/ui.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faBell: IconDefinition = faBell;
  faBars: IconDefinition = faBars;
  faSearch: IconDefinition = faSearch;

  constructor(
    private uiService: UIService
  ) { }

  ngOnInit(): void {
  }

  toggleNavigation(): void {
    this.uiService.toggleNavigation(true);
  }

  toggleSearch(): void {
    this.uiService.toggleSearch(true);
  }
}

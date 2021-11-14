import { Component, OnInit } from '@angular/core';
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'SearchBox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {

  faSearch: IconDefinition = faSearch;

  constructor() { }

  ngOnInit(): void {
  }

}

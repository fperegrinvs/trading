import {Component, OnDestroy, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {UIService} from "../../../../service/ui.service";
import {Subscription} from "rxjs";
import {DocumentSearchService} from "../../../../module/document/service/document.search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'SearchBox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  faSearch: IconDefinition = faSearch;
  faTimes: IconDefinition = faTimes;
  isShow: boolean = false;
  term: string = "";

  constructor(
    private uiService: UIService,
    private documentService: DocumentSearchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const onSearchToggled = this.uiService.onSearchToggled()
      .subscribe(isShow => {
        this.isShow = isShow;
      });

    this.subscriptions.push(onSearchToggled);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  closeSearch() {
    this.uiService.toggleSearch(false);
  }

  onSearch(): void {
    this.router.navigate(["/app", "search"])
      .then(success => {
        this.documentService.doSearch(this.term);
      });
  }
}

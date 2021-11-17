import {Component, OnDestroy, OnInit} from '@angular/core';
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import {UIService} from "../../../../service/ui.service";
import {Subscription} from "rxjs";

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

  constructor(
    private uiService: UIService
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
}

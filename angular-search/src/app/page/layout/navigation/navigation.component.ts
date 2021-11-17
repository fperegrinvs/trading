import {Component, OnDestroy, OnInit} from '@angular/core';
import {UIService} from "../../../service/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  isOpen: boolean = false;

  constructor(
    private uiService: UIService
  ) { }

  ngOnInit(): void {
    const navigationToggledSub = this.uiService.onNavigationToggled()
      .subscribe(isOpen => {
        this.isOpen = isOpen;
      });

    this.subscriptions.push(navigationToggledSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

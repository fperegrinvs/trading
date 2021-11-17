import {Component, OnDestroy, OnInit} from '@angular/core';
import {UIService} from "../../../service/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'Overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  isShow: boolean = false;

  constructor(
    private uiService: UIService
  ) { }

  ngOnInit(): void {
    const onOverlayToggled = this.uiService.onOverlayToggled()
      .subscribe(isShow => {
        this.isShow = isShow
      });

    this.subscriptions.push(onOverlayToggled);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  overlayClicked() {
    this.uiService.toggleNavigation(false);
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {UIService} from "../../../service/ui.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  isOpen: boolean = false;
  menus: any = [
    {
      icon: 'bx-search-alt.svg',
      text: 'Tìm kiếm',
      path: '/app/search'
    },
    {
      icon: 'bxs-star.svg',
      text: 'Các mục đánh dấu',
      path: '/app/bookmark'
    },
    {
      icon: 'bx-cloud-upload.svg',
      text: 'Tải lên tài liệu',
      path: '/app/upload'
    },
  ]

  constructor(
    private uiService: UIService,
    private router: Router
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

  getMenuIcon(menu: any): string {
    if (this.router.url === menu.path) {
      // active
      return 'assets/icons/primary/' + menu.icon;
    }

    return 'assets/icons/gray/' + menu.icon;
  }
}

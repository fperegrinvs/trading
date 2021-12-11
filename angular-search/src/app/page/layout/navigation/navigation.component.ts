import {Component, OnDestroy, OnInit} from '@angular/core';
import {UIService} from "../../../service/ui.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import { DocumentSearchService } from 'src/app/module/document/service/document.search.service';

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
    {
      icon: 'bx-list-check.svg',
      text: 'Duyệt tài liệu',
      path: '/app/approve',
      badge: "0"
    }
  ]

  constructor(
    private uiService: UIService,
    private router: Router,
    private documentService: DocumentSearchService
  ) { }

  ngOnInit(): void {
    const navigationToggledSub = this.uiService.onNavigationToggled()
      .subscribe(isOpen => {
        this.isOpen = isOpen;
      });

    const approveCountChanged = this.uiService.onApproveCountChanged()
      .subscribe(bool => {
        this.countApprove();
      });

    this.subscriptions.push(navigationToggledSub);
    this.subscriptions.push(approveCountChanged);

    this.countApprove();
  }

  private countApprove(): void {
    this.documentService.countNeedApproval()
    .subscribe(res => {
      this.menus.forEach((menu: any) => {
        if (menu.path === "/app/approve") {
          menu.badge = res.toString();
        }
      })
    });
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

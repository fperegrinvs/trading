import {MatIconModule} from '@angular/material/icon';
//metronic
import {CommonModule} from '@angular/common';

import {AvatarModule} from 'ngx-avatar';

import {HeaderComponent} from './components/header/header.component';
import {LeftMenuComponent} from './components/left-menu/left-menu.component';
import {NgModule} from '@angular/core';
import {FooterComponent} from './components/footer/footer.component';
import {LayoutComponent} from './layout.component';
import {TopBarComponent} from './components/topbar/topbar.component';
import {PagesRoutingModule} from '../pages-routing.module';
import {BottomTopbarLogoutComponent} from "./components/bottom-topbar-logout/bottom-topbar-logout.component";
import {OverlayModule} from "@angular/cdk/overlay";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [CommonModule, AvatarModule, MatIconModule, PagesRoutingModule, OverlayModule, TranslateModule],
  exports: [FooterComponent, LayoutComponent, LeftMenuComponent, HeaderComponent, TopBarComponent, BottomTopbarLogoutComponent],
  declarations: [LayoutComponent, FooterComponent, LeftMenuComponent, FooterComponent, HeaderComponent, TopBarComponent, BottomTopbarLogoutComponent],
  providers: [],
})
export class LayoutModule {
}

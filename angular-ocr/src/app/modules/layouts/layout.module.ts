import { MatIconModule } from '@angular/material/icon';
//metronic
import { CommonModule } from '@angular/common';

import { AvatarModule } from 'ngx-avatar';

import { HeaderComponent } from './components/header/header.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './layout.component';
import { TopBarComponent } from './components/topbar/topbar.component';
import { PagesRoutingModule } from '../pages-routing.module';
@NgModule({
  imports: [CommonModule, AvatarModule, MatIconModule, PagesRoutingModule],
  exports: [FooterComponent, LayoutComponent, LeftMenuComponent, HeaderComponent, TopBarComponent],
  declarations: [LayoutComponent, FooterComponent, LeftMenuComponent, FooterComponent, HeaderComponent, TopBarComponent],
  providers: [],
})
export class LayoutModule {}

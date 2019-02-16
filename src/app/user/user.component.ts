import { Component } from '@angular/core';
import { MENU_ITEMS } from './user-menu';
import { HttpClient } from '@angular/common/http';
import { NbMenuService } from '@nebular/theme';
import { AppGlobalService } from '../others/global.service';

@Component({
  styleUrls: ['user.component.scss'],
  template: `
    <app-layout [navTitle]='navTitle'>
      <nb-menu [items]="menu" tag="user-menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class UserComponent {
  constructor(
    appGlobalService: AppGlobalService,
    private nBmenuService: NbMenuService,
    private httpClient: HttpClient) {
    if (!appGlobalService.haveAddedMenu) {
      this.getMenu().subscribe(value => {
        value.forEach((item, index) => {
          nBmenuService.addItems([{
            title: item.name,
            link: '/user/article',
            queryParams: { id: item.id },
          }], 'user-menu');
          if (index === value.length - 1) {
            this.addLastItem();
          }
        });
      });
      appGlobalService.haveAddedMenu = true;
    }
  }
  getMenu(): any {
    return this.httpClient.get('http://localhost:3000/classification/findClassifications');
  }
  /**
   *fix:当切换模块时,会导致之前添加的最后一个元素重新添加.
   *reason:尚不清楚.
   *solution:只能手动将最后一个元素设置为隐藏,以保证用户体验.
   */
  addLastItem() {
    this.nBmenuService.addItems([{
      title: undefined,
      hidden: true,
    }], 'user-menu');
  }
  navTitle = '博客展览系统';
  menu = MENU_ITEMS;
}

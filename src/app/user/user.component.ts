import { Component } from '@angular/core';
import { MENU_ITEMS } from './user-menu';
import { HttpClient } from '@angular/common/http';
import { NbMenuService } from '@nebular/theme';

@Component({
  styleUrls: ['user.component.scss'],
  template: `
    <app-layout [navTitle]="navTitle">
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class UserComponent {
  constructor(
    nBmenuService: NbMenuService,
    private httpClient: HttpClient) {
    this.getMenu().subscribe(value => {
      value.forEach(item => {
        nBmenuService.addItems([{
          title: item.name,
          link: '/user/article',
          queryParams: { id: item.id },
        }]);
      });
    });
  }
  getMenu(): any {
    return this.httpClient.get(`http://localhost:3000/classification/findClassifications`);
  }
  navTitle = '博客展览系统';
  menu = MENU_ITEMS;
}

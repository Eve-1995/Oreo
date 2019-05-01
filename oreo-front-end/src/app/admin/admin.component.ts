import { Component } from '@angular/core';
import { MENU_ITEMS } from './admin-menu';

@Component({
  styleUrls: ['admin.component.scss'],
  template: `
    <app-layout [navTitle]="navTitle">
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class AdminComponent {
  navTitle = '管理中心';
  menu = MENU_ITEMS;
}

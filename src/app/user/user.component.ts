import { Component } from '@angular/core';
import { MENU_ITEMS } from './user-menu';

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
  navTitle = '博客展览系统';
  menu = MENU_ITEMS;
}

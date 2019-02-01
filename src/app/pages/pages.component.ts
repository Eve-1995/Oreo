import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  styleUrls: ['pages.component.scss'],
  template: `
    <app-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}

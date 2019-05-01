import { Component, OnInit, OnDestroy } from '@angular/core';
import { MENU_ITEMS } from './visit-menu';
import { HttpClient } from '@angular/common/http';
import { NbMenuService } from '@nebular/theme';
import { AppGlobalService } from '../others/global.service';
import { Observable, Subscription } from 'rxjs';

interface Menu {
  id: number;
  createTime: Date;
  updateTime: Date;
  name: string;
  keywords: string;
}
@Component({
  styleUrls: ['visit.component.scss'],
  template: `
    <app-layout [navTitle]='navTitle'>
      <nb-menu [items]="menu" tag="visit-menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class VisitComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(
    private appGlobalService: AppGlobalService,
    private nBmenuService: NbMenuService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    if (!this.appGlobalService.haveAddedMenu) {
      this.subscription = this.getMenu().subscribe(value => {
        value.forEach((item: Menu, index: number) => {
          this.nBmenuService.addItems([{
            title: item.name,
            link: '/visit/article',
            queryParams: { id: item.id },
          }], 'visit-menu');
          if (index === value.length - 1) {
            this.addLastItem();
          }
        });
      });
      this.appGlobalService.haveAddedMenu = true;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getMenu(): Observable<any> {
    return this.httpClient.get('classification/findClassifications');
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
    }]);
  }
  navTitle = '';
  menu = MENU_ITEMS;
}

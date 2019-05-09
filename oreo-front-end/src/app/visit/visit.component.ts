import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './visit-menu';
import { NbMenuService } from '@nebular/theme';
import { AppGlobalService } from '../others/global.service';
import { VisitService } from './visit.service';

@Component({
  styleUrls: ['visit.component.scss'],
  template: `
    <app-layout [navTitle]='navTitle'>
      <nb-menu [items]="menu" tag="visit-menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-layout>
  `,
  providers: [VisitService]
})
export class VisitComponent implements OnInit {
  public navTitle = '';
  public menu = MENU_ITEMS;

  constructor(
    private appGlobalService: AppGlobalService,
    private nBmenuService: NbMenuService,
    private visitService: VisitService,
  ) { }

  ngOnInit(): void {
    this.navigateToFirstArticle();
  }

  // 当进入visit模块时
  navigateToFirstArticle(): void {
    if (!this.appGlobalService.haveAddedMenu) {
      this.visitService.getMenu().subscribe(value => {
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
}

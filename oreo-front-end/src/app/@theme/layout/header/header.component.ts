import { Component, OnInit, Input } from '@angular/core';
import { NbSidebarService, NbMenuService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';
import { Router } from '@angular/router';
import { AppGlobalService } from '../../../others/global.service';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class AppHeaderComponent implements OnInit {
  constructor(
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private menuService: NbMenuService,
    private globalService: AppGlobalService,
    private router: Router,
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }
  @Input() title: string;
  userInfo: any;

  userMenu = [{ title: '个人中心' }, { title: '登出' }];

  onContecxtItemSelection(title) {
    switch (title) {
      case '登出':
        localStorage.removeItem('userInfo');
        this.userInfo = null;
        this.router.navigate(['/visit/article']);
        break;
      case '个人中心':
        this.router.navigate(['/user/profile']);
        break;
    }
  }
  ngOnInit(): void {
    this.menuService.onItemClick().subscribe((event) => {
      this.onContecxtItemSelection(event.item.title);
    });
    this.globalService.watchUserInfo.subscribe(v => {
      this.userInfo.nickname = v;
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }
}

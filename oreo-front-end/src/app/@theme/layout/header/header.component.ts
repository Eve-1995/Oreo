import { Component, OnInit, Input } from '@angular/core';
import { NbSidebarService, NbMenuService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';
import { Router } from '@angular/router';
import { AppGlobalService } from '../../../global/service/global.service';
import { AppSettingService } from '../../../global/service/setting.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Input() title: string;

  constructor(
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private menuService: NbMenuService,
    private globalService: AppGlobalService,
    private settingService: AppSettingService,
    private router: Router,
  ) { }
  userInfo: any;

  userMenu = [];

  onContecxtItemSelection(title) {
    switch (title) {
      case '登陆':
        this.router.navigate(['/auth/login']);
        break;
      case '注册':
        this.router.navigate(['/auth/register']);
        break;
      case '登出':
        // this.userMenu = []; // 会报错
        localStorage.removeItem('oreoToken');
        this.userInfo = null;
        this.router.navigate(['/visit']);
        window.location.reload();
        break;
      case '个人中心':
        this.router.navigate(['/user']);
        break;
      case '管理中心':
        this.router.navigate(['/admin']);
        break;
      case '博文中心':
        this.router.navigate(['/visit']);
        break;
    }
  }
  ngOnInit(): void {
    this.userInfo = this.settingService.user;
    if (this.userInfo) {
      this.userMenu.push({ title: '个人中心' });
      if (this.userInfo.level === 1) this.userMenu.push({ title: '管理中心' });
      this.userMenu.push({ title: '博文中心' });
      this.userMenu.push({ title: '登出' });
    } else {
      this.userMenu.push({ title: '登陆' });
      this.userMenu.push({ title: '注册' });
    }
    this.menuService.onItemClick().subscribe((event) => {
      this.onContecxtItemSelection(event.item.title);
    });
    this.globalService.watchUserInfo$.subscribe(v => {
      this.userInfo.nickname = v;
    });

    this.globalService.logOut$.subscribe(() => {
      this.userInfo = this.settingService.user;
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }
}

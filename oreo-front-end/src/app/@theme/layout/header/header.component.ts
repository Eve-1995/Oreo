import { Component, OnInit, Input } from '@angular/core';
import { NbSidebarService, NbMenuService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';
import { Router } from '@angular/router';

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
    private router: Router,
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
  }
  @Input() title: string;
  userInfo: any;

  userMenu = [{ title: '登出' }];

  onContecxtItemSelection(title) {
    if (title === '登出') {
      localStorage.removeItem('userInfo');
      this.userInfo = null;
      this.router.navigate(['/user/article']);
    }
  }
  ngOnInit(): void {
    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }
}

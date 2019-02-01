import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: any;

  userMenu = [{ title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }
}

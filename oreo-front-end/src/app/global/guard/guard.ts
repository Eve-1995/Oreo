import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AppSettingService } from '../service/setting.service';

@Injectable()
export class AdminGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private settingService: AppSettingService
  ) { }
  canActivateChild() {
    const userInfo = this.settingService.user;
    if (userInfo && userInfo.level === 1) {
      return true;
    }
    return this.router.createUrlTree(['/visit/article']);
  }
}

@Injectable()
export class LoginGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private settingService: AppSettingService
  ) { }
  canActivateChild() {
    const userInfo = this.settingService.user;
    if (userInfo) {
      return true;
    }
    return this.router.createUrlTree(['/auth/login']);
  }
}

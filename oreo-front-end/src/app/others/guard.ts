import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivateChild {
  constructor(private router: Router) { }
  canActivateChild() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.level === 1) {
      return true;
    }
    return this.router.createUrlTree(['/visit/article']);
  }
}

@Injectable()
export class UserGuard implements CanActivateChild {
  constructor(private router: Router) { }
  canActivateChild() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      return true;
    }
    return this.router.createUrlTree(['/visit/article']);
  }
}

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router) { }
  canActivateChild() {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo != null) {
      return this.router.createUrlTree(['/visit/article']);
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivateChild {
  constructor(private router: Router) { }
  canActivateChild() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.role === 'admin') {
      return true;
    }
    return this.router.createUrlTree(['/user/article']);
  }
}

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router) { }
  canActivateChild() {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo != null) {
      return this.router.createUrlTree(['/user/article']);
    }
    return true;
  }
}

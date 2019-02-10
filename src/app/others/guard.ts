import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivateChild {
  constructor(private router: Router) { }
  canActivateChild() {
    const roleInfo = localStorage.getItem('roleInfo');
    if (roleInfo === 'admin') {
      return true;
    }
    return this.router.createUrlTree(['/user/article'], { queryParams: { id: 1 } });
  }
}

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router) { }
  canActivateChild() {
    const roleInfo = localStorage.getItem('roleInfo');
    if (roleInfo != null) {
      return this.router.createUrlTree(['/user/article'], { queryParams: { id: 1 } });
    }
    return true;
  }
}

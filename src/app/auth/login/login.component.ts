import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  providers: [LoginService],
})
export class AppLoginComponent {
  constructor(
    private router: Router,
    private service: LoginService) { }
  user: any = {};
  submitted: boolean = false;

  login(): void {
    this.submitted = true;
    this.service.login(this.user).subscribe(value => {
      if (!value.legal) {
        console.log('不存在该用户');
      } else {
        if (value.role === 'user') {
          console.log('user');
          localStorage.setItem('roleInfo', 'user');
          this.router.navigate(['/user/article'], {
            queryParams: {
              id: 1,
            },
          });
        } else if (value.role === 'admin') {
          console.log('admin');
          localStorage.setItem('roleInfo', 'admin');
          this.router.navigate(['/admin/classification']);
        }
      }
    });
  }
}

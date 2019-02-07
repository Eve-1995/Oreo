import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
  providers: [LoginService],
})
export class AppLoginComponent {
  constructor(
    private service: LoginService) { }
  user: any = {};
  submitted: boolean = false;

  login(): void {
    // this.submitted = true;
    this.service.login(this.user).subscribe(value => {
      if (!value.legal) {
        console.log('不存在该用户');
      } else {
        if (value.role === 'user') {
          console.log('user');
        } else if (value.role === 'management') {
          console.log('management');
        }
      }
    });
  }
}

import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ResponseDTO } from '../../others/response.dto';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    this.service.login(this.user).subscribe((v: ResponseDTO) => {
      if (v.code === 200) {
        localStorage.setItem('userInfo', JSON.stringify(v.data));
        if (v.data.level === 0) {
          this.router.navigate(['/visit/article']);
        } else if (v.data.level === 1) {
          this.router.navigate(['/admin/classification']);
        }
      }
      this.submitted = false;
    });
  }
}

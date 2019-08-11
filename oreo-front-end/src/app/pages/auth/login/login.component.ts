import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AppGlobalService, Auth } from '../../../global/service/global.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService],
})
export class AppLoginComponent {
  public user: any = {};
  public submitted: boolean = false;

  constructor(
    private router: Router,
    private globalService: AppGlobalService,
    private service: LoginService
  ) { }

  public login(): void {
    this.submitted = true;
    this.service.login(this.user).subscribe((v: Auth) => {
      this.globalService.userInfo = v;
      localStorage.setItem('userInfo', JSON.stringify(v));
      if (v.level === 0) {
        this.router.navigate(['/visit/article']);
      } else if (v.level === 1) {
        this.router.navigate(['/admin/classification']);
      }
      this.submitted = false;
    });
  }
}

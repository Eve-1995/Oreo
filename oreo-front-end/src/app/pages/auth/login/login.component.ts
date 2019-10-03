import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../../../global/service/global.service';
import { NbToastrService } from '@nebular/theme';
import { AppSettingService } from '../../../global/service/setting.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService],
})
export class AppLoginComponent {
  public user: any = {};
  public submitted: boolean = false;
  public redirectUrl = '';

  public forgetPassword(): void {
    this.toastrService.show('', '忘了就再注册一个, 懒得做这个功能');
  }

  public login(): void {
    this.submitted = true;
    this.service.login(this.user).subscribe((v: Auth) => {
      this.settingService.setUser(v);
      localStorage.setItem('oreoToken', v.token);
      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]);
      } else {
        if (v.level === 0) {
          this.router.navigate(['/visit/article']);
        } else if (v.level === 1) {
          this.router.navigate(['/admin/classification']);
        }
      }
      this.submitted = false;
      localStorage.removeItem('unLogin');
    },
      () => this.submitted = false
    );
  }

  public registerHandler(): void {
    if (this.redirectUrl) {
      this.router.navigate(['/auth/register', { redirectUrl: this.redirectUrl }]);
    } else {
      this.router.navigate(['/auth/register']);
    }
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private settingService: AppSettingService,
    private toastrService: NbToastrService,
    private service: LoginService
  ) {
    this.redirectUrl = this.activatedRoute.snapshot.paramMap.get('redirectUrl');
  }
}

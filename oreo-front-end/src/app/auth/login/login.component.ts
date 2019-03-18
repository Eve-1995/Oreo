import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ResponseDTO } from '../../others/response.dto';
import { NbToastrService } from '@nebular/theme';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService],
})
export class AppLoginComponent {
  constructor(
    private router: Router,
    private service: LoginService,
    private toastrService: NbToastrService) { }
  user: any = {};
  submitted: boolean = false;

  login(): void {
    this.submitted = true;
    this.service.login(this.user).subscribe((v: ResponseDTO) => {
      if (v.code === 200) {
        this.toastrService.success('', v.message);
        localStorage.setItem('userInfo', JSON.stringify(v.data));
        if (v.data.level === 0) {
          this.router.navigate(['/visit/article']);
        } else if (v.data.level === 1) {
          this.router.navigate(['/admin/classification']);
        }
      } else {
        this.toastrService.warning('', v.message);
        this.submitted = false;
      }
    });
  }
}

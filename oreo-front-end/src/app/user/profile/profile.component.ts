import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { ResponseDTO } from '../../others/response.dto';
import { Observable } from 'rxjs';
import { AppGlobalService } from '../../others/global.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.scss'],
  providers: [ProfileService],
})
export class AppProfileComponent implements OnInit {
  constructor(
    private service: ProfileService,
    private globalService: AppGlobalService,
  ) { }

  personalLoading = true;
  accountLoading = true;
  user: any = {};
  personalSubmitted: boolean = false;
  accountSubmitted: boolean = false;
  phoneBoolean = false;
  emailBoolean = false;

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    this.service.getUser(user.id).subscribe(v => {
      this.user = v.data;
      this.phoneBoolean = !!this.user.phone;
      this.emailBoolean = !!this.user.email;
      localStorage.setItem('userInfo', JSON.stringify(this.user));
      this.personalLoading = false;
      this.accountLoading = false;
      this.globalService.refreshUserInfo(this.user.nickname);
    });
  }

  personalSave() {
    this.personalSubmitted = true;
    this.personalLoading = true;
    this.service.save(this.user).subscribe((v: ResponseDTO) => {
      if (v.code === 200) {
        this.ngOnInit();
      }
      this.personalSubmitted = false;
    });
  }

  accountSave() {
    this.accountSubmitted = true;
    this.accountLoading = true;
    this.service.save(this.user).subscribe((v: ResponseDTO) => {
      if (v.code === 200) {
        this.ngOnInit();
      }
      this.accountSubmitted = false;
    });
  }
}

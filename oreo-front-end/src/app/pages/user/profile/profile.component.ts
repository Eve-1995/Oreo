import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { NbDialogService } from '@nebular/theme';
import { AppGlobalService } from '../../../global/service/global.service';
import { AppConfirmComponent } from '../../../global/components/confirm/confirm.component';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.scss'],
  providers: [ProfileService],
})
export class AppProfileComponent implements OnInit {
  constructor(
    private service: ProfileService,
    private globalService: AppGlobalService,
    private dialogService: NbDialogService,
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
      this.user = v;
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
    this.service.save(this.user).subscribe(v => {
      this.ngOnInit();
      this.personalSubmitted = false;
    });
  }

  accountSave() {
    this.dialogService.open(AppConfirmComponent, { context: { content: '手机号与邮箱一旦设定将无法再修改,确定要更新吗?' } }).onClose.subscribe(value => {
      if (value === 'yes') {
        this.accountSubmitted = true;
        this.accountLoading = true;
        this.service.save(this.user).subscribe(v => {
          this.ngOnInit();
          this.accountSubmitted = false;
        });
      }
    });
  }
}

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

  ngOnInit(): void {
    this.service.getUser().subscribe(v => {
      this.user = v;
      this.phoneBoolean = !!this.user.phone;
      this.personalLoading = false;
      this.accountLoading = false;
    });
  }

  personalSave() {
    this.personalSubmitted = true;
    this.personalLoading = true;
    this.service.updateUser(this.user).subscribe(v => {
      this.ngOnInit();
      this.personalSubmitted = false;
    });
  }

  accountSave() {
    this.accountSubmitted = true;
    this.accountLoading = true;
    this.service.updateUser(this.user).subscribe(v => {
      this.ngOnInit();
      this.accountSubmitted = false;
      this.globalService.watchUserInfo$.next(this.user.nickname);
    });
  }
}

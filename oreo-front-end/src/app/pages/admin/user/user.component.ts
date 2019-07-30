import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService, User } from './user.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AppConfirmComponent } from '../../../global/components/confirm/confirm.component';
import { AppAdminComponent } from '../basic/admin-basic.component';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['user.component.scss'],
  providers: [UserService],
})
export class AppUserComponent extends AppAdminComponent implements OnInit, AfterViewInit {
  public selectedObj = new User();

  constructor(
    private userService: UserService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    this.tableSettings.columns = {
      nickname: {
        title: '用户名',
        editable: false,
        filter: false,
      },
      realname: {
        title: '真实姓名',
        editable: false,
        filter: false,
      },
      liveCity: {
        title: '现居城市',
        editable: false,
        filter: false,
      },
      phone: {
        title: '手机',
        editable: false,
        filter: false,
      },
      email: {
        title: '邮箱',
        editable: false,
        filter: false,
      },
      likeAmount: {
        title: '点赞数',
        editable: false,
        filter: false,
      },
      collectAmount: {
        title: '收藏数',
        editable: false,
        filter: false,
      },
      commentAmount: {
        title: '评论数',
        editable: false,
        filter: false,
      }
    };
    this.userService.findTableInfo().subscribe(value => {
      this.tableSource.load(value);
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(300), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.fetchTableList();
      });
  }

  public delete(): void {
    if (!this.selectedObj.id) {
      this.toastrService.show('', '请选择记录', { status: NbToastStatus.WARNING });
    } else {
      this.dialogService.open(AppConfirmComponent).onClose.subscribe(value => {
        if (value === 'yes') {
          this.userService.delete(this.selectedObj.id).subscribe(() => {
            this.selectedObj = new User();
            this.fetchTableList();
          });
        }
      });
    }
  }

  private fetchTableList(): void {
    this.loading = true;
    this.userService.findTableInfo(this.filterInfo).subscribe(value => {
      this.tableSource.load(value);
      this.loading = false;
    });
  }
}

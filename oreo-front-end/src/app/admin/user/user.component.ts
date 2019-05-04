import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from './user.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { AppConfirmComponent } from '../../@theme/global-components/confirm/confirm.component';
import { Subscription } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['user.component.scss'],
  providers: [UserService],
})
export class AppUserComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private id: number;
  loading = true;
  filterName: string;
  source: LocalDataSource = new LocalDataSource();
  // fetchTableList$ = new Subject();
  settings = {
    actions: false,
    hideSubHeader: true,
    noDataMessage: '暂无数据',
    columns: {
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
        title: '点赞',
        editable: false,
        filter: false,
      },
      collectAmount: {
        title: '收藏',
        editable: false,
        filter: false,
      },
      commentAmount: {
        title: '评论',
        editable: false,
        filter: false,
      }
    },
  };

  constructor(
    private userService: UserService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.subscription = this.userService.findTableInfo().subscribe(value => {
      this.source.load(value.data);
      this.source.setPaging(1, 5);
      this.loading = false;
    });
    // this.fetchTableList$.pipe(debounceTime(300)).subscribe(() => {
    //   this.fetchTableList();
    // });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchTableList(): void {
    this.loading = true;
    this.userService.findByFilter(this.filterName).subscribe(value => {
      this.source.load(value);
      this.loading = false;
    });
  }
  onRowSelect(e): void {
    this.id = e.data.id;
  }

  delete(): void {
    if (this.id) {
      this.dialogService.open(AppConfirmComponent).onClose.subscribe(value => {
        if (value === 'yes') {
          this.subscription = this.userService.delete(this.id).subscribe(() => {
            this.fetchTableList();
          });
        }
      });
    } else {
      this.toastrService.show('', '请选择记录', { status: NbToastStatus.WARNING });
    }
  }
}

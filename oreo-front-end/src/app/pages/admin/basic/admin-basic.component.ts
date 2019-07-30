import { OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { NgModel } from '@angular/forms';

export class AppAdminComponent implements OnDestroy {
  public unsubscribe$ = new Subject<void>();
  public loading = true; // 表格loading
  public filterInfo: string; // 搜索框变量
  public tableSource: LocalDataSource = new LocalDataSource();
  public dialogSettings = { // 对话框配置
    closeOnEsc: false,
    hasBackdrop: false
  };
  public tableSettings = { // 表格配置
    actions: false,
    hideSubHeader: true,
    noDataMessage: '暂无数据',
    columns: {} // 依据子页面而定
  };

  @ViewChild('searchInput') searchInput: NgModel;

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { IndexService } from './index.service';
import { AppConfirmComponent } from '../children/confirm/confirm.component';
import { AppDialogNameComponent } from './dialog-name-prompt/dialog-name-prompt.component';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['index.component.scss'],
  providers: [IndexService],
})
export class AppIndexComponent {
  constructor(
    private dialogService: NbDialogService,
    private indexService: IndexService,
    private toastrService: NbToastrService) {
    indexService.getClassificationInfo().subscribe(value => {
      this.source.load(value);
      this.source.setPaging(1, 5);
    });
  }
  key: string;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: {
      columnTitle: '操作',
    },
    hideSubHeader: true,
    noDataMessage: '暂无数据',
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: '类别名称',
        filter: false,
      },
      articleAmount: {
        title: '文章总数',
        editable: false,
        filter: false,
      },
      likeAmount: {
        title: '点赞总数',
        editable: false,
        filter: false,
      },
      commentAmount: {
        title: '评论总数',
        editable: false,
        filter: false,
      },
    },
  };

  onDeleteConfirm(event): void {
    this.dialogService.open(AppConfirmComponent).onClose.subscribe(value => {
      if (value === 'yes') {
        this.indexService.deleteClassificationById(event.data.id).subscribe(result => {
          if (result) {
            event.confirm.resolve();
            this.toastrService.show('', '删除成功', { status: NbToastStatus.SUCCESS });
          } else {
            event.confirm.reject();
            this.toastrService.show('', '删除失败', { status: NbToastStatus.WARNING });
          }
        });
      }
    });
  }
  onEditConfirm(event): void {
    this.indexService.updateClassificationName(event.newData.id, event.newData.name).subscribe(value => {
      if (value) {
        this.toastrService.show('', '更新成功', { status: NbToastStatus.SUCCESS });
        event.confirm.resolve();
      } else {
        this.toastrService.show('', '更新失败', { status: NbToastStatus.WARNING });
        event.confirm.reject();
      }
    });
  }
  add() {
    this.dialogService.open(AppDialogNameComponent).onClose.subscribe(name => {
      if (name != null) {
        this.indexService.addClassification(name).subscribe(result => {
          this.find();
          this.toastrService.show('', '添加成功', { status: NbToastStatus.SUCCESS });
        });
      }
    });
  }
  find() {
    this.indexService.findClassificationByName(this.key).subscribe(value => {
      this.source.load(value);
    });
  }
}

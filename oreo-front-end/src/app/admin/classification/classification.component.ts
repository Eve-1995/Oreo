import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { AppDialogNameComponent } from './dialog-name-prompt/dialog-name-prompt.component';
import { ClassificationService } from './classification.service';
import { Classification, CreateClassification } from './classification.dto';
import { AppConfirmComponent } from '../../@theme/global-components/confirm/confirm.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  templateUrl: './classification.component.html',
  styleUrls: ['classification.component.scss'],
  providers: [ClassificationService],
})
export class AppClassificationComponent implements OnInit {
  public fetchTableList$ = new Subject();
  public loading = true;
  public filterName: string;
  public source: LocalDataSource = new LocalDataSource();
  public selectedObj = new Classification();
  public settings = {
    actions: false,
    hideSubHeader: true,
    noDataMessage: '暂无数据',
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
      collectAmount: {
        title: '收藏总数',
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

  constructor(
    private dialogService: NbDialogService,
    private classificationService: ClassificationService,
    private toastrService: NbToastrService) {
    classificationService.findTableInfo().subscribe(value => {
      this.source.load(value);
      this.source.setPaging(1, 5);
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.fetchTableList$.pipe(debounceTime(300)).subscribe(() => {
      this.fetchTableList();
    });
  }


  public onRowSelect(event) {
    this.selectedObj = event.data;
  }

  public create() {
    this.dialogService.open(AppDialogNameComponent, { context: { operation: 'create' }, closeOnEsc: false, hasBackdrop: false }).onClose.subscribe((v: CreateClassification) => {
      if (v !== undefined) {
        this.classificationService.save({ name: v.name, keywords: v.keywords }).subscribe(() => {
          this.fetchTableList();
        });
      }
    });
  }

  public delete(): void {
    if (this.selectedObj.id === undefined) {
      this.toastrService.show('', '请选择记录', { status: NbToastStatus.WARNING });
    } else {
      this.dialogService.open(AppConfirmComponent).onClose.subscribe(value => {
        if (value === 'yes') {
          this.classificationService.delete(this.selectedObj.id).subscribe(result => {
            this.selectedObj = new Classification();
            this.fetchTableList();
          });
        }
      });
    }
  }

  public edit(): void {
    if (this.selectedObj.id === undefined) {
      this.toastrService.show('', '请选择记录', { status: NbToastStatus.WARNING });
    } else {
      this.classificationService.findDetail(this.selectedObj.id).subscribe(value => {
        this.dialogService.open(AppDialogNameComponent, { context: { operation: 'edit', data: value }, closeOnEsc: false, hasBackdrop: false }).onClose.subscribe((v: CreateClassification) => {
          if (v !== undefined) {
            this.classificationService.save({ id: v.id, name: v.name, keywords: v.keywords }).subscribe(() => {
              this.fetchTableList();
            });
          }
        });
      });
    }
  }

  private fetchTableList() {
    this.loading = true;
    this.classificationService.findTableInfo(this.filterName).subscribe(value => {
      this.source.load(value);
      this.loading = false;
    });
  }
}

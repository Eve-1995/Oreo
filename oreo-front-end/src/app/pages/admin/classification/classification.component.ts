import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ClassificationService, Classification, CreateClassification, EditClassification } from './classification.service';
import { AppConfirmComponent } from '../../../global/components/confirm/confirm.component';
import { AppAdminComponent } from '../basic/admin-basic.component';
import { AppCreateOrEditClassificationComponent } from './components/create-or-edit-classification/create-or-edit-classification.component';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['classification.component.scss'],
  providers: [ClassificationService],
})
export class AppClassificationComponent extends AppAdminComponent implements OnInit, AfterViewInit {
  public selectedObj = new Classification();

  constructor(
    private dialogService: NbDialogService,
    private classificationService: ClassificationService,
    private toastrService: NbToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    this.tableSettings.columns = {
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
    };
    this.classificationService.findTableInfo().subscribe(value => {
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

  public create() {
    this.dialogService.open(AppCreateOrEditClassificationComponent, { context: { operation: 'create' }, ...this.dialogSettings }).onClose.subscribe((v: CreateClassification) => {
      if (v) {
        this.classificationService.save(v).subscribe(() => {
          this.fetchTableList();
        });
      }
    });
  }

  public edit(): void {
    if (!this.selectedObj.id) {
      this.toastrService.show('', '请选择记录', { status: NbToastStatus.WARNING });
    } else {
      this.classificationService.findDetail(this.selectedObj.id).subscribe(value => {
        this.dialogService.open(AppCreateOrEditClassificationComponent, { context: { operation: 'edit', data: value }, ...this.dialogSettings }).onClose.subscribe((v: EditClassification) => {
          if (v) {
            this.classificationService.save(v).subscribe(() => {
              this.fetchTableList();
            });
          }
        });
      });
    }
  }

  public delete(): void {
    if (!this.selectedObj.id) {
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

  private fetchTableList() {
    this.loading = true;
    this.classificationService.findTableInfo(this.filterInfo).subscribe(value => {
      this.tableSource.load(value);
      this.loading = false;
    });
  }
}

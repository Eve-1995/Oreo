import { Component, TemplateRef, OnInit, AfterViewInit } from '@angular/core';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ArticleService, ArticleClassificationDto } from './article.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AppConfirmComponent } from '../../../global/components/confirm/confirm.component';
import { AppAdminComponent } from '../basic/admin-basic.component';
import { Classification } from '../classification/classification.service';

@Component({
  selector: 'app-admin-article',
  templateUrl: './article.component.html',
  styleUrls: ['article.component.scss'],
  providers: [ArticleService],
})
export class AppArticleComponent extends AppAdminComponent implements OnInit, AfterViewInit {
  public selectedObj = new ArticleClassificationDto();
  public classificationGroup: Classification[];

  public create(dialog: TemplateRef<any>): void {
    this.selectedObj = new ArticleClassificationDto();
    this.dialogService.open(dialog, {
      context: {
        operation: 'create',
      },
    }).onClose.subscribe(value => {
      if (value === 'yes') {
        const arr = [];
        this.selectedObj.classificationIds.forEach(item => {
          arr.push({ id: item });
        });
        this.selectedObj.classifications = arr;
        this.articleService.save(this.selectedObj).subscribe(() => {
          this.fetchTableList();
        });
      }
    });
  }

  public openMarkdown: () => void = () => window.open(`${window.location.origin}/admin/create-or-edit/article `, '_blank');

  public edit(dialog: TemplateRef<any>): void {
    if (!this.selectedObj.id) {
      this.toastrService.show('', '请选择记录', { status: NbToastStatus.WARNING });
    } else {
      this.articleService.findDetail(this.selectedObj.id).subscribe(value => {
        this.selectedObj = value;
        /**
        *fix:无法使用this.selectedObj.classifications填充编辑时的选中下拉框
        *reason:ArticleClassificationDto这个类是Article包含多个Classification的模型，其classifications是对象集合，而下拉框控件API要求绑定的是number[]，所以无法绑定
        *solution:添加classificationIds:number[]字段，专门用于绑定下拉字段，手动填充数据，而因记录详情是从服务器获取后覆盖的，而导致该字段会被覆盖，需要手动初始化
        */
        this.selectedObj.classificationIds = [];
        this.selectedObj.classifications.forEach(item => {
          this.selectedObj.classificationIds.push(item.id);
        });
      });
      this.dialogService.open(dialog, {
        context: {
          operation: 'edit',
        },
      }).onClose.subscribe(value => {
        if (value === 'yes') {
          /**
          *fix:编辑文章归类时，数据库多对多关系只多不少
          *reason:下拉框绑定的是classificationIds,而ORM映射的是classifications。所以，实际类别的确没变化
          *solution:双重for循环校验以同步两个字段的数据
          */
          const arr = [];
          this.selectedObj.classificationIds.forEach(item => {
            arr.push({ id: item });
          });
          this.selectedObj.classifications = arr;
          this.articleService.save(this.selectedObj).subscribe(() => {
            this.fetchTableList();
          });
        }
      });
    }
  }

  public delete(): void {
    if (!this.selectedObj.id) {
      this.toastrService.show('', '请选择记录', { status: NbToastStatus.WARNING });
    } else {
      this.dialogService.open(AppConfirmComponent).onClose.subscribe(value => {
        if (value === 'yes') {
          this.articleService.delete(this.selectedObj.id).subscribe(result => {
            this.selectedObj = new ArticleClassificationDto();
            this.fetchTableList();
          });
        }
      });
    }
  }

  private fetchTableList(): void {
    this.loading = true;
    this.articleService.findTableInfo(this.filterInfo).subscribe(value => {
      this.tableSource.load(value);
      this.loading = false;
    });
  }

  constructor(
    private dialogService: NbDialogService,
    private articleService: ArticleService,
    private toastrService: NbToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    this.tableSettings.columns = {
      name: {
        title: '文章名称',
        filter: false,
        width: '30%'
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
      }
    };
    this.articleService.findTableInfo().subscribe(value => {
      this.tableSource.load(value);
      this.loading = false;
    });
    this.articleService.getClassificationNames().subscribe(value => {
      this.classificationGroup = value;
    });
  }

  ngAfterViewInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(300), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.fetchTableList();
      });
  }
}

import { Component, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { AppConfirmComponent } from '../children/confirm/confirm.component';
import { ArticleService } from './article.service';
import { ArticleClassificationDto } from './article.dto';
import { Classification } from '../classification/classification.dto';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['article.component.scss'],
  providers: [ArticleService],
})
export class AppArticleComponent {
  constructor(
    private dialogService: NbDialogService,
    private articleService: ArticleService,
    private toastrService: NbToastrService) {
    articleService.findBasicInfoList().subscribe(value => {
      this.source.load(value);
      this.source.setPaging(1, 5);
      this.loading = false;
    });
    articleService.getClassificationNames().subscribe(value => {
      this.classificationGroup = value;
    });
  }
  loading = true;
  editOrCreateClassification = [];
  classificationGroup: Classification[];
  filterName: string;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    hideSubHeader: true,
    noDataMessage: '暂无数据',
    columns: {
      name: {
        title: '文章名称',
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
  selectedObj = new ArticleClassificationDto();
  onRowSelect(event) {
    this.selectedObj = event.data;
  }
  edit(dialog: TemplateRef<any>) {
    if (this.selectedObj.id === undefined) {
      this.toastrService.show('', '请选择记录', { status: NbToastStatus.WARNING });
    } else {
      this.articleService.findBasicInfo(this.selectedObj.id).subscribe(value => {
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
          this.selectedObj.classifications.forEach(item1 => {
            this.selectedObj.classificationIds.forEach(item2 => {
              if (item2 === item1.id) arr.push(item1);
            });
          });
          this.selectedObj.classifications = arr;
          this.articleService.save(this.selectedObj).subscribe(() => {
            this.fetchTableList();
            this.toastrService.show('', '添加成功', { status: NbToastStatus.SUCCESS });
          });
        }
      });
    }
  }

  create(dialog: TemplateRef<any>) {
    this.selectedObj = new ArticleClassificationDto();
    this.dialogService.open(dialog, {
      context: {
        operation: 'create',
      },
    }).onClose.subscribe(value => {
      if (value === 'yes') {
        this.articleService.save(this.selectedObj).subscribe(() => {
          this.fetchTableList();
          this.toastrService.show('', '添加成功', { status: NbToastStatus.SUCCESS });
        });
      }
    });
  }
  delete(): void {
    if (this.selectedObj.id === undefined) {
      this.toastrService.show('', '请选择记录', { status: NbToastStatus.WARNING });
    } else {
      this.dialogService.open(AppConfirmComponent).onClose.subscribe(value => {
        if (value === 'yes') {
          this.articleService.delete(this.selectedObj.id).subscribe(result => {
            this.toastrService.show('', '删除成功', { status: NbToastStatus.SUCCESS });
            this.fetchTableList();
          });
        }
      });
    }
  }
  fetchTableList() {
    this.loading = true;
    this.articleService.findByFilter(this.filterName).subscribe(value => {
      this.source.load(value);
      this.loading = false;
    });
  }
}

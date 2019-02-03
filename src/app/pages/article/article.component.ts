import { Component, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { AppConfirmComponent } from '../children/confirm/confirm.component';
import { ArticleService } from './article.service';
import { Article } from './article.dto';
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
    articleService.findBasicInfo().subscribe(value => {
      this.source.load(value);
      this.source.setPaging(1, 5);
    });
    articleService.getClassificationNames().subscribe(value => {
      this.classificationGroup = value;
    });
  }
  selectedClassification;
  classificationGroup: Classification[];
  key: string;
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

  selectedObj = new Article();
  onRowSelect(event) {
    this.selectedObj = event.data;
  }

  edit(dialog: TemplateRef<any>) {
    if (this.selectedObj.classification != null) {
      this.selectedClassification = this.selectedObj.classification.id;
    } else {
      this.selectedClassification = -1;
    }
    this.dialogService.open(dialog, {
      context: {
        op: 'edit',
      },
    }).onClose.subscribe(value => {
      if (value === 'yes') {
        console.log('hello');
        const temp = new Classification();
        temp.id = this.selectedClassification;
        console.log(`this.selectedClassification=${this.selectedClassification}`);
        this.selectedObj.classification = temp;
        console.log(this.selectedObj);
        this.articleService.update(this.selectedObj).subscribe(() => {
          this.find();
          this.toastrService.show('', '更新成功', { status: NbToastStatus.SUCCESS });
        });
      }
    });
  }

  create(dialog: TemplateRef<any>) {
    this.selectedObj.id = undefined;
    this.selectedObj.name = undefined;
    this.selectedObj.content = undefined;
    this.selectedObj.likeAmount = undefined;
    this.selectedObj.commentAmount = undefined;
    this.selectedObj.classification = undefined;
    this.selectedClassification = undefined;
    this.dialogService.open(dialog, {
      context: {
        op: 'create',
      },
    }).onClose.subscribe(value => {
      if (value === 'yes') {
        const demo = new Classification();
        demo.id = this.selectedClassification;
        this.selectedObj.classification = demo;
        this.articleService.create(this.selectedObj).subscribe(() => {
          this.find();
          this.toastrService.show('', '添加成功', { status: NbToastStatus.SUCCESS });
        });
      }
    });
  }
  delete(): void {
    this.dialogService.open(AppConfirmComponent).onClose.subscribe(value => {
      if (value === 'yes') {
        this.articleService.delete(this.selectedObj.id).subscribe(result => {
          if (result) {
            this.toastrService.show('', '删除成功', { status: NbToastStatus.SUCCESS });
            this.source.remove(this.selectedObj);
          } else {
            this.toastrService.show('', '删除失败', { status: NbToastStatus.WARNING });
          }
        });
      }
    });
  }
  find() {
    this.articleService.findByName(this.key).subscribe(value => {
      this.source.load(value);
    });
  }
}

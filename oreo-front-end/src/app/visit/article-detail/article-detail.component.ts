import { Component } from '@angular/core';
import { AppArticleDetailService } from './article-detail.service';
import { ActivatedRoute } from '@angular/router';
import { ArticleDetailDTO } from './dto/article-detail.dto';
import { NbToastrService } from '@nebular/theme';
import { AppGlobalService } from '../../others/global.service';
import { ResponseDTO } from '../../others/response.dto';

@Component({
  templateUrl: './article-detail.component.html',
  styleUrls: ['article-detail.component.scss'],
  providers: [AppArticleDetailService],
})
export class AppArticleDetailComponent {
  constructor(
    activatedRoute: ActivatedRoute,
    private service: AppArticleDetailService,
    private toastrService: NbToastrService,
    private globalService: AppGlobalService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.id !== undefined) {
        service.findDetailById(queryParams.id).subscribe(value => {
          this.articleDetail = value;
          this.initActionStatus();
          this.loading = false;
        });
      }
    });
  }
  loading = true;
  articleDetail = new ArticleDetailDTO();
  copied() {
    this.toastrService.success('', '链接复制成功!');
  }
  get copyContent() {
    return `${this.articleDetail.name} - Eve\n${location.href}`;
  }
  hasCollection = false;
  collect() {
    const user = this.globalService.getUserInfo();
    this.service.collect(user.id, this.articleDetail.id).subscribe((v: ResponseDTO) => {
      if (v.code === 200) {
        this.hasCollection = true;
      } else if (v.code === 201) {
        this.hasCollection = false;
      }
    });
  }
  // 当用户查看文章时,判断用户是否已点赞、已收藏
  initActionStatus() {
    const user = this.globalService.getUserInfo();
    this.service.actionStatus(user.id, this.articleDetail.id).subscribe((v: ResponseDTO) => {
      if (v.data.hasCollect) {
        this.hasCollection = true;
      }
    })
  }
}

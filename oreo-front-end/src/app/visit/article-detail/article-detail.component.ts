import { Component, TemplateRef } from '@angular/core';
import { AppArticleDetailService } from './article-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDetailDTO } from './dto/article-detail.dto';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { AppGlobalService } from '../../others/global.service';
import { ResponseDTO } from '../../others/response.dto';
import { AppArticleDetailReplyComponent } from './article-detail-reply.component';

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
    private router: Router,
    private dialogService: NbDialogService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.id !== undefined) {
        this.articleId = queryParams.id;
        this.getAticleInfo();
        this.getComments();
      }
    });
    this.user = this.globalService.getUserInfo();
  }
  focus = false;
  articleId;
  user: any;
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
    // 执行收藏或取消收藏操作
    if (!!this.user) {
      this.service.collect(this.user.id, this.articleDetail.id).subscribe((v: ResponseDTO) => {
        if (v.code === 200) {
          this.hasCollection = true;
        } else if (v.code === 201) {
          this.hasCollection = false;
        }
        // 重新请求文章数据
        this.getAticleInfo();
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
  hasLike = false;
  like() {
    // 执行点赞或取消点赞操作
    if (!!this.user) {
      this.service.like(this.user.id, this.articleDetail.id).subscribe((v: ResponseDTO) => {
        if (v.code === 200) {
          this.hasLike = true;
        } else if (v.code === 201) {
          this.hasLike = false;
        }
        // 重新请求文章数据
        this.getAticleInfo();
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
  getAticleInfo() {
    this.service.findDetailById(this.articleId).subscribe(value => {
      this.articleDetail = value.data;
      this.getActionStatus();
    });
  }
  // 当用户查看文章时,判断用户是否已点赞、已收藏
  getActionStatus() {
    if (!!this.user) {
      this.service.actionStatus(this.user.id, this.articleDetail.id).subscribe((v: ResponseDTO) => {
        this.hasCollection = v.data.hasCollect ? true : false;
        this.hasLike = v.data.hasLike ? true : false;
        this.loading = false;
      });
    }
  }
  comments;
  getComments() {
    this.service.getCommentsByArticle(this.articleId).subscribe((v: ResponseDTO) => {
      this.comments = v.data;
    });
  }
  commentContent = '';
  onBlur() {
    if (this.commentContent.trim().length > 0) {
      this.focus = true;
    } else {
      this.focus = false;
      this.commentContent = '';
    }
  }
  doComment() {
    if (this.commentContent.trim().length > 0) {
      this.focus = false;
      this.service.saveComment(this.commentContent, this.user.id, this.articleId).subscribe(() => {
        this.getComments();
        this.commentContent = '';
        this.getAticleInfo();
      });
    }
  }
  keyUpHandler(event: KeyboardEvent) {
    if (event.keyCode === 13 && event.ctrlKey) {
      this.doComment();
    }
  }
  ReplyKeyUpHandler(event: KeyboardEvent) {
    if (event.keyCode === 13 && event.ctrlKey) {
      this.doComment();
    }
  }

  doReply(fromUser: string, parentCommentId: number, rootCommentId: number) {
    this.globalService.refreshMaskState(true);
    this.dialogService.open(AppArticleDetailReplyComponent, { context: { fromUser }, closeOnEsc: false, hasBackdrop: false }).onClose.subscribe((v: { replyContent: string }) => {
      if (v !== undefined) {
        this.service.saveComment(v.replyContent, this.user.id, this.articleId, parentCommentId, rootCommentId).subscribe(() => {
          this.getComments();
        });
      }
      // this.replyContent = '';
      this.globalService.refreshMaskState(false);
    });
  }
}

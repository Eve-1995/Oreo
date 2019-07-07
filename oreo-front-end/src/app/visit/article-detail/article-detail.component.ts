import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppArticleDetailService } from './article-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { AppGlobalService } from '../../others/global.service';
import { AppArticleDetailReplyComponent } from './article-detail-reply.component';
import { CommentWithArticle } from '../../../../../common/interface/comment.interface';
import { ArticleBasicInfo } from '../../../../../common/interface/article.interface';

@Component({
  templateUrl: './article-detail.component.html',
  styleUrls: ['article-detail.component.scss'],
  providers: [AppArticleDetailService],
})
export class AppArticleDetailComponent implements OnInit {
  public focus = false;
  public loading = true;
  public hasCollection = false;
  public hasLike = false;
  public comments;
  public commentContent = '';
  // 必须初始化对象, 因使用了interface来定义DTO, 而模板中也使用到了该对象, 不初始化会导致运行时错误
  public articleDetail: ArticleBasicInfo = {
    'id': undefined,
    'name': undefined,
    'createTime': undefined,
    'updateTime': undefined,
    'content': undefined,
    'likeAmount': undefined,
    'collectAmount': undefined,
    'commentAmount': undefined,
  };

  private articleId: any;
  private user: any;

  constructor(
    public toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    private service: AppArticleDetailService,
    private globalService: AppGlobalService,
    private router: Router,
    private dialogService: NbDialogService,
  ) {
    this.user = this.globalService.getUserInfo();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.id) {
        this.articleId = queryParams.id;
        this.getAticleInfo();
        this.getComments();
      }
    });
  }

  // 执行收藏或取消收藏操作
  public collect() {
    if (!!this.user) {
      this.service.collect(this.user.id, this.articleDetail.id).subscribe(() => {
        // 重新请求文章数据
        this.getAticleInfo();
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  // 执行点赞或取消点赞操作
  public like() {
    if (!!this.user) {
      this.service.like(this.user.id, this.articleDetail.id).subscribe(() => {
        // 重新请求文章数据
        this.getAticleInfo();
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  // 评论输入框的失焦事件
  public onBlur() {
    if (this.commentContent.trim().length > 0) {
      this.focus = true;
    } else {
      this.focus = false;
      this.commentContent = '';
    }
  }

  // 提交评论
  public doComment() {
    if (this.commentContent.trim().length > 0) {
      this.focus = false;
      this.service.saveComment(this.commentContent, this.user.id, this.articleId).subscribe(() => {
        this.getComments();
        this.commentContent = '';
        this.getAticleInfo();
      });
    }
  }

  // 快捷键 ctrl+enter 即可提交评论
  public keyUpHandler(event: KeyboardEvent) {
    if (event.keyCode === 13 && event.ctrlKey) {
      this.doComment();
    }
  }

  // 弹出评论回复框
  public doReply(fromUser: string, parentCommentId: number, rootCommentId: number) {
    this.globalService.refreshMaskState(true);
    this.dialogService.open(AppArticleDetailReplyComponent, { context: { fromUser }, closeOnEsc: false, hasBackdrop: false }).onClose.subscribe((v: { replyContent: string }) => {
      if (v) {
        this.service.saveComment(v.replyContent, this.user.id, this.articleId, parentCommentId, rootCommentId).subscribe(() => {
          this.getComments();
        });
      }
      this.globalService.refreshMaskState(false);
    });
  }

  /**
   * 获取'文章'的评论内容
   */
  private getComments() {
    console.log('获取文章评论内容');
    this.service.getCommentsByArticle(this.articleId).subscribe((v: CommentWithArticle[]) => {
      this.comments = v;
      this.loading = false;
    });
  }

  /**
   * 获取'文章'的基本信息
   */
  private getAticleInfo() {
    this.service.findDetailById(this.articleId).subscribe((value: ArticleBasicInfo) => {
      this.articleDetail = value;
      this.getActionStatus();
    });
  }

  /**
   * 判断用户是否已点赞、已收藏
   */
  private getActionStatus() {
    if (!!this.user) {
      this.service.actionStatus(this.user.id, this.articleDetail.id).subscribe((v: { hasCollect: boolean, hasLike: boolean }) => {
        this.hasCollection = v.hasCollect ? true : false;
        this.hasLike = v.hasLike ? true : false;
      });
    }
  }

  // 设置粘贴板文本内容
  get copyContent() {
    return `${this.articleDetail.name} - Eve\n${location.href}`;
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppArticleDetailService } from './article-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { AppArticleDetailReplyComponent } from './article-detail-reply.component';
import { AppGlobalService } from '../../service/global.service';

@Component({
  selector: 'app-article-detail',
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
  public articleDetail = {
    id: undefined,
    name: undefined,
    createTime: undefined,
    updateTime: undefined,
    content: undefined,
    likeAmount: undefined,
    collectAmount: undefined,
    commentAmount: undefined,
  };

  private articleId: any;

  constructor(
    public toastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    private service: AppArticleDetailService,
    private globalService: AppGlobalService,
    private router: Router,
    private dialogService: NbDialogService,
  ) { }

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
    if (!!this.globalService.userInfo) {
      this.service.collect(this.articleDetail.id).subscribe(() => {
        // 重新请求文章数据
        this.getAticleInfo();
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  // 执行点赞或取消点赞操作
  public like() {
    if (!!this.globalService.userInfo) {
      this.service.like(this.articleDetail.id).subscribe(() => {
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
      this.service.saveComment(this.commentContent, this.articleId).subscribe(() => {
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
        this.service.saveComment(v.replyContent, this.articleId, parentCommentId, rootCommentId).subscribe(() => {
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
    this.service.getCommentsByArticle(this.articleId).subscribe(v => {
      this.comments = v;
      this.loading = false;
    });
  }

  /**
   * 获取'文章'的基本信息
   */
  private getAticleInfo() {
    this.service.findBasicInfo(this.articleId).subscribe(value => {
      this.articleDetail = value;
      this.getActionStatus();
    });
  }

  /**
   * 判断用户是否已点赞、已收藏
   */
  private getActionStatus() {
    if (!!this.globalService.userInfo) {
      this.service.actionStatus(this.articleDetail.id).subscribe((v: { hasCollect: boolean, hasLike: boolean }) => {
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from './article.service';
import { ClassificationWithArticles } from '../../../../../../common/interface/article.interface';
import { ClassificationDTO } from '../../../../../../common/interface/classification.interface';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['article.component.scss'],
  providers: [ArticleService],
})
export class AppArticleComponent implements OnInit {
  public name: string;
  public items = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: ArticleService,
  ) { }

  ngOnInit(): void {
    this.listenRouteChange();
  }

  /**
   * 当跳转至article路由时, 若无指定'类别'id, 则取第一个类别进行分类查看文章
   */
  listenRouteChange(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.id) {
        this.service.findArticlesByClassificationId(queryParams.id).subscribe((v: ClassificationWithArticles) => {
          this.name = v.name;
          this.items = v.articles;
        });
      } else {
        this.service.findFirstMenu().subscribe((v: ClassificationDTO) => {
          this.router.navigate(['/visit/article'], {
            queryParams: {
              id: v.id,
            },
          });
        });
      }
    });
  }

  /**
   * 跳转页面查看文章详情
   * @param id '文章'id
   */
  checkArticle(id: number) {
    this.router.navigate(['/visit/article-detail'], {
      queryParams: {
        id: id,
      },
    });
  }
}

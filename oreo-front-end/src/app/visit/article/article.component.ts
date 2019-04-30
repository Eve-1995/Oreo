import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from './article.service';
import { ArticleList } from './article.dto';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['article.component.scss'],
  providers: [ArticleService],
})
export class AppArticleComponent {
  name: string;
  items = [];
  constructor(
    private router: Router,
    activatedRoute: ActivatedRoute,
    service: ArticleService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.id === undefined) {
        service.findFirstMenu().subscribe(value => {
          router.navigate(['/visit/article'], {
            queryParams: {
              id: value.id,
            },
          });
        });
      } else {
        service.findArticlesByClassificationId(queryParams.id).subscribe((v: ArticleList) => {
          this.name = v.data.name;
          this.items = v.data.articles;
        });
      }
    });
  }
  checkArticle(id: number) {
    this.router.navigate(['/visit/article-detail'], {
      queryParams: {
        id: id,
      },
    });
  }
}

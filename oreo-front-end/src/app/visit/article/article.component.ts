import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from './article.service';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['article.component.scss'],
  providers: [ArticleService],
})
export class AppArticleComponent {
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
        service.findArticlesByClassificationId(queryParams.id).subscribe(value => {
          if (value != null) {
            this.items = value.data.articles;
            this.name = value.data.name;
          }
        });
      }
    });
  }
  name;
  items = [];
  checkArticle(id: number) {
    this.router.navigate(['/visit/article-detail'], {
      queryParams: {
        id: id,
      },
    });
  }
}

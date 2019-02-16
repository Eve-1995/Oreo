import { Component } from '@angular/core';
import { AppArticleDetailService } from './article-detail.service';
import { ActivatedRoute } from '@angular/router';
import { ArticleDetailDTO } from './dto/article-detail.dto';

@Component({
  templateUrl: './article-detail.component.html',
  styleUrls: ['article-detail.component.scss'],
  providers: [AppArticleDetailService],
})
export class AppArticleDetailComponent {
  constructor(
    activatedRoute: ActivatedRoute,
    service: AppArticleDetailService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.id !== undefined) {
        service.findArticleById(queryParams.id).subscribe(value => {
          this.articleDetail = value;
        });
      }
    });
  }
  articleDetail = new ArticleDetailDTO();
}

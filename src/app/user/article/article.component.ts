import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['article.component.scss'],
})
export class AppArticleComponent {
  constructor(
    activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      console.log(queryParams.id);
    });
  }

}

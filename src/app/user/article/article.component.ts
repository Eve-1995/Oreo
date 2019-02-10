import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['article.component.scss'],
})
export class AppArticleComponent {
  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.id === undefined) {
        router.navigate(['/user/article'], {
          queryParams: {
            id: 7,
          },
        });
      } else {
        console.log(queryParams.id);
      }
    });
  }

}

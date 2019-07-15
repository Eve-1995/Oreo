import { Component, OnInit } from '@angular/core';
import { CollectionService } from './collection.service';
import { AppGlobalService } from '../../others/global.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './collection.component.html',
  styleUrls: ['collection.component.scss'],
  providers: [CollectionService],
})
export class AppCollectionComponent implements OnInit {
  public items = [];

  constructor(
    private router: Router,
    private appGlobalService: AppGlobalService,
    private service: CollectionService
  ) { }

  ngOnInit(): void {
    const userInfo = this.appGlobalService.getUserInfo();
    this.service.getCollections(userInfo.id).subscribe(v => {
      this.items = v;
    });
  }

  checkArticle(id: number) {
    this.router.navigate(['/user/article-detail'], {
      queryParams: {
        id: id,
      },
    });
  }
}

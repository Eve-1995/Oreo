import { Component, OnInit } from '@angular/core';
import { CollectionService } from './collection.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './collection.component.html',
  styleUrls: ['collection.component.scss'],
  providers: [CollectionService],
})
export class AppCollectionComponent implements OnInit {
  public items = [];

  checkArticle(id: number) {
    this.router.navigate(['/user/article-detail'], {
      queryParams: {
        id: id,
      },
    });
  }

  constructor(
    private router: Router,
    private service: CollectionService
  ) { }

  ngOnInit(): void {
    this.service.getCollections().subscribe(v => {
      this.items = v;
    });
  }
}

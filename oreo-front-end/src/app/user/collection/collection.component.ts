import { Component } from '@angular/core';
import { CollectionService } from './collection.service';

@Component({
  templateUrl: './collection.component.html',
  styleUrls: ['collection.component.scss'],
  providers: [CollectionService],
})
export class AppCollectionComponent {
}

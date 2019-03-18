import { Component } from '@angular/core';
import { CommentService } from './comment.service';

@Component({
  templateUrl: './comment.component.html',
  styleUrls: ['comment.component.scss'],
  providers: [CommentService],
})
export class AppCommentComponent {
}

import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
@Component({
  templateUrl: 'article-detail-reply.component.html'
})
export class AppArticleDetailReplyComponent {
  replyContent: string = '';
  @Input() fromUser: string;

  constructor(
    private ref: NbDialogRef<AppArticleDetailReplyComponent>
  ) { }

  keyUpHandler(event: KeyboardEvent) {
    if (event.keyCode === 13 && event.ctrlKey) {
      this.submit();
    }
  }

  submit() {
    this.ref.close({ replyContent: this.replyContent });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Classification } from '../classification.dto';
@Component({
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class AppDialogNameComponent implements OnInit {
  constructor(
    private ref: NbDialogRef<AppDialogNameComponent>
  ) { }
  title: string;
  keywords = [];
  newKeyword = '';
  @Input() operation: string;
  @Input() data: Classification;

  ngOnInit(): void {
    if (this.operation === 'edit') {
      this.title = this.data.name;
      if (this.data.keywords) {
        this.keywords = JSON.parse(this.data.keywords);
      }
    }
  }

  add() {
    if (this.newKeyword.trim().length > 0) {
      this.keywords.push(this.newKeyword);
    }
    this.newKeyword = '';
  }

  submit() {
    if (this.operation === 'create') {
      this.ref.close({ name: this.title, keywords: JSON.stringify(this.keywords) });
    } else if (this.operation === 'edit') {
      this.ref.close({ id: this.data.id, name: this.title, keywords: JSON.stringify(this.keywords) });
    }
  }
}

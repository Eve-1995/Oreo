import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Classification } from '../classification.dto';
@Component({
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class AppDialogNameComponent implements OnInit {
  public title: string;
  public keywords = [];
  public newKeyword = '';

  @Input() operation: 'create' | 'edit';
  @Input() data: Classification;

  constructor(
    private ref: NbDialogRef<AppDialogNameComponent>
  ) { }

  ngOnInit(): void {
    if (this.operation === 'edit') {
      this.title = this.data.name;
      if (this.data.keywords) {
        this.keywords = JSON.parse(this.data.keywords);
      }
    }
  }

  public add(): void {
    if (this.newKeyword.trim().length > 0) {
      this.keywords.push(this.newKeyword);
    }
    this.newKeyword = '';
  }

  public submit(): void {
    if (this.operation === 'create') {
      this.ref.close({ name: this.title, keywords: JSON.stringify(this.keywords) });
    } else if (this.operation === 'edit') {
      this.ref.close({ id: this.data.id, name: this.title, keywords: JSON.stringify(this.keywords) });
    }
  }
}

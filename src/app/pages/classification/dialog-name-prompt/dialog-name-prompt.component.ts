import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class AppDialogNameComponent {

  constructor(protected ref: NbDialogRef<AppDialogNameComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }
}

import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  templateUrl: 'confirm.component.html',
  styleUrls: ['confirm.component.scss'],
})
export class AppConfirmComponent {
  constructor(protected ref: NbDialogRef<AppConfirmComponent>) { }
  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close('yes');
  }
}

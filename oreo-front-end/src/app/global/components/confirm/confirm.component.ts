import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  templateUrl: 'confirm.component.html',
  styleUrls: ['confirm.component.scss'],
})
export class AppConfirmComponent {
  constructor(protected ref: NbDialogRef<AppConfirmComponent>) { }
  @Input() title: string = '请确认';
  @Input() content: string = '删除后数据不可恢复,请慎重考虑!';
  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close('yes');
  }
}

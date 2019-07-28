import { Component, Input } from '@angular/core';
import { Fragment } from '../fragment.service';
import { NbDialogRef } from '@nebular/theme';
@Component({
  selector: 'app-create-or-edit-fragment',
  templateUrl: 'create-or-edit-fragment.component.html',
  styleUrls: ['create-or-edit-fragment.component.scss'],
})
export class AppCreateOrEditFragmentComponent {
  @Input() operation: 'create' | 'edit';
  @Input() data: Fragment = new Fragment();

  constructor(
    public ref: NbDialogRef<AppCreateOrEditFragmentComponent>
  ) { }

  public submit(valid: boolean): void {
    if (valid) {
      this.ref.close(this.data);
    }
  }
}

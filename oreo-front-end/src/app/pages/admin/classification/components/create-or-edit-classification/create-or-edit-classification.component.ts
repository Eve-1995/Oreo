import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Classification } from '../../classification.service';

@Component({
  selector: 'app-create-or-edit-classification',
  templateUrl: 'create-or-edit-classification.component.html',
  styleUrls: ['create-or-edit-classification.component.scss'],
})
export class AppCreateOrEditClassificationComponent {
  @Input() operation: 'create' | 'edit';
  @Input() data: Classification = new Classification();

  constructor(
    private ref: NbDialogRef<AppCreateOrEditClassificationComponent>
  ) { }

  public submit(valid: boolean): void {
    if (valid) {
      this.ref.close(this.data);
    }
  }
}

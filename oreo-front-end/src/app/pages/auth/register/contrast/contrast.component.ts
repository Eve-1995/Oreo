import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ContrastService } from './contrast.service';

@Component({
  templateUrl: 'contrast.component.html',
  styleUrls: ['contrast.component.scss'],
  providers: [ContrastService],
})
export class AppContrastComponent {
  public value: string;

  constructor(
    private service: ContrastService,
    public ref: NbDialogRef<AppContrastComponent>
  ) {
    this.value = this.service.getContrast();
  }
}

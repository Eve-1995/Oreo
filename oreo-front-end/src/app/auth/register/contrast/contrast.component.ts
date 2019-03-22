import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ContrastService } from './contrast.service';

@Component({
  templateUrl: 'contrast.component.html',
  styleUrls: ['contrast.component.scss'],
  providers: [ContrastService],
})
export class AppContrastComponent {
  constructor(
    public ref: NbDialogRef<AppContrastComponent>,
    private service: ContrastService,
  ) {
    this.value = this.service.getContrast();
  }
  value;
}

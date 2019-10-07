import { Component, Input } from '@angular/core';

@Component({
  templateUrl: 'svg.component.html',
  selector: 'app-svg'
})
export class AppSvgComponent {
  @Input() width = '16px';
  @Input() height = '16px';
  @Input() type: string;
  @Input() top = '0px';
  @Input() right = '0px';
  @Input() bottom = '0px';
  @Input() left = '0px';
}

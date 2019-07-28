import { Component, Input } from '@angular/core';

@Component({
  templateUrl: 'svg.component.html',
  selector: 'app-svg'
})
export class AppSvgComponent {
  @Input() width = '1.2em';
  @Input() height = '1.2em';
  @Input() type;
  @Input() left = '0px';
  @Input() top = '0px';
}

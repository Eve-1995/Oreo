import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { VisitComponent } from './visit.component';
import { VisitRoutingModule } from './visit-routing.module';

@NgModule({
  imports: [
    VisitRoutingModule,
    ThemeModule,
  ],
  declarations: [
    VisitComponent,
  ],
})
export class VisitModule {
}

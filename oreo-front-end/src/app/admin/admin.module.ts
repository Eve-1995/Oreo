import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
  ],
  declarations: [
    AdminComponent,
  ],
})
export class AdminModule {
}

import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    UserRoutingModule,
    ThemeModule,
  ],
  declarations: [
    UserComponent,
  ],
})
export class UserModule {
}

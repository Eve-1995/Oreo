import { NgModule } from '@angular/core';
import { UserRoutingModule, userRoutedComponents } from './user-routing.module';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  imports: [
    UserRoutingModule,
    ThemeModule,
  ],
  declarations: [
    ...userRoutedComponents
  ],
})
export class UserModule { }

import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { httpInterceptorProviders } from '../others/interceptor';

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
  ],
  declarations: [
    AdminComponent,
  ],
  providers: [
    httpInterceptorProviders
  ],
})
export class AdminModule {
}

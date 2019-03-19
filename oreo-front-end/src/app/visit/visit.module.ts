import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { VisitComponent } from './visit.component';
import { VisitRoutingModule } from './visit-routing.module';
import { NbToastrModule } from '@nebular/theme/components/toastr/toastr.module';
import { httpInterceptorProviders } from '../others/interceptor';

@NgModule({
  imports: [
    VisitRoutingModule,
    ThemeModule,
    NbToastrModule.forRoot()
  ],
  declarations: [
    VisitComponent
  ],
  providers: [
    httpInterceptorProviders
  ],
})
export class VisitModule {
}

import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { VisitComponent } from './visit.component';
import { VisitRoutingModule } from './visit-routing.module';
import { httpInterceptorProviders } from '../others/interceptor';
import { NbToastrModule } from '@nebular/theme/components/toastr/toastr.module';

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

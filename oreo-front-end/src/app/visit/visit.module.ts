import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { VisitRoutingModule, visitiRoutedComponents } from './visit-routing.module';
import { NgxMdModule } from 'ngx-md';
import { httpInterceptorProviders } from '../others/interceptor';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  imports: [
    NgxMdModule.forRoot(),
    VisitRoutingModule,
    ThemeModule,
    ClipboardModule
  ],
  declarations: [
    ...visitiRoutedComponents
  ],
  providers: [
    httpInterceptorProviders
  ]
})
export class VisitModule { }

import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { VisitRoutingModule, visitiRoutedComponents } from './visit-routing.module';
import { NgxMdModule } from 'ngx-md';
import { httpInterceptorProviders } from '../others/interceptor';
import { NbDialogModule } from '@nebular/theme';
import { ArticleDetailModule } from '../common/module/article-detail/article-detail.module';


@NgModule({
  imports: [
    NgxMdModule.forRoot(),
    VisitRoutingModule,
    ThemeModule,
    ArticleDetailModule
  ],
  declarations: [
    ...visitiRoutedComponents
  ],
  providers: [
    httpInterceptorProviders,
    ...NbDialogModule.forRoot().providers,
  ]
})
export class VisitModule { }

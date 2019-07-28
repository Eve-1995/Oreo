import { NgModule } from '@angular/core';
import { VisitRoutingModule, visitiRoutedComponents } from './visit-routing.module';
import { NgxMdModule } from 'ngx-md';
import { NbDialogModule } from '@nebular/theme';
import { ArticleDetailModule } from '../../global/components/article-detail/article-detail.module';
import { ThemeModule } from '../../@theme/theme.module';
import { httpInterceptorProviders } from '../../global/interceptor';


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

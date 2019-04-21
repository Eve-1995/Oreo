import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { VisitRoutingModule, visitiRoutedComponents } from './visit-routing.module';
import { NgxMdModule } from 'ngx-md';
import { httpInterceptorProviders } from '../others/interceptor';
import { ClipboardModule } from 'ngx-clipboard';
import { AppArticleDetailReplyComponent } from './article-detail/article-detail-reply.component';
import { NbDialogModule } from '@nebular/theme';

const CHILD_COMPONENT = [
  AppArticleDetailReplyComponent
];

@NgModule({
  imports: [
    NgxMdModule.forRoot(),
    VisitRoutingModule,
    ThemeModule,
    ClipboardModule
  ],
  declarations: [
    ...visitiRoutedComponents,
    AppArticleDetailReplyComponent
  ],
  entryComponents: [
    AppArticleDetailReplyComponent
  ],
  providers: [
    httpInterceptorProviders,
    ...NbDialogModule.forRoot().providers,
  ]
})
export class VisitModule { }

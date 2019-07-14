import { NgModule } from '@angular/core';
import { UserRoutingModule, userRoutedComponents } from './user-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ArticleDetailModule } from '../common/module/article-detail/article-detail.module';
import { httpInterceptorProviders } from '../others/interceptor';

@NgModule({
  imports: [
    UserRoutingModule,
    ThemeModule,
    ArticleDetailModule
  ],
  declarations: [
    ...userRoutedComponents
  ],
  providers: [
    httpInterceptorProviders
  ]
})
export class UserModule { }

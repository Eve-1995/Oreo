import { NgModule } from '@angular/core';
import { UserRoutingModule, userRoutedComponents } from './user-routing.module';
import { ArticleDetailModule } from '../../global/components/article-detail/article-detail.module';
import { AppFragmentComponent } from './fragment/fragment.component';
import { ThemeModule } from '../../@theme/theme.module';
import { httpInterceptorProviders } from '../../global/interceptor';

@NgModule({
  imports: [
    UserRoutingModule,
    ThemeModule,
    ArticleDetailModule
  ],
  declarations: [
    AppFragmentComponent,
    ...userRoutedComponents
  ],
  providers: [
    httpInterceptorProviders
  ]
})
export class UserModule { }

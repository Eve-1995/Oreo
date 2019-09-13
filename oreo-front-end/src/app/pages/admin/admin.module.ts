import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminRoutingModule, adminRouteComponents } from './admin-routing.module';
import { NbDialogModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { httpInterceptorProviders } from '../../global/interceptor';
import { AppCreateOrEditFragmentComponent } from './fragment/components/create-or-edit-fragment/create-or-edit-fragment.component';
import { AppCreateOrEditClassificationComponent } from './classification/components/create-or-edit-classification/create-or-edit-classification.component';
import { MarkdownlModule } from '../../global/components/markdown/markdown.module';

const CHILD_COMPONENT = [
  AppCreateOrEditClassificationComponent,
  AppCreateOrEditFragmentComponent
];

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    MarkdownlModule // 新建文章时使用的markdown
  ],
  declarations: [
    ...adminRouteComponents,
    ...CHILD_COMPONENT
  ],
  entryComponents: [
    ...CHILD_COMPONENT,
  ],
  providers: [
    httpInterceptorProviders,
    ...NbDialogModule.forRoot().providers,
  ]
})
export class AdminModule {
}

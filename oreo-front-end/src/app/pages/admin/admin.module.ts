import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminRoutingModule, adminRoutedComponents } from './admin-routing.module';
import { AppDialogNameComponent } from './classification/dialog-name-prompt/dialog-name-prompt.component';
import { NbDialogModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { httpInterceptorProviders } from '../../global/interceptor';
import { AppCreateOrEditFragmentComponent } from './fragment/components/create-or-edit-fragment.component';

const CHILD_COMPONENT = [
  AppDialogNameComponent,
  AppCreateOrEditFragmentComponent
];

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...adminRoutedComponents,
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

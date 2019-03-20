import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminRoutingModule, adminRoutedComponents } from './admin-routing.module';
import { AppDialogNameComponent } from './classification/dialog-name-prompt/dialog-name-prompt.component';
import { httpInterceptorProviders } from '../others/interceptor';
import { NbDialogModule } from '@nebular/theme';
import { AppConfirmComponent } from './children/confirm/confirm.component';

const CHILD_COMPONENT = [
  AppDialogNameComponent,
  AppConfirmComponent
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

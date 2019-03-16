import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule, NbCardModule, NbToastrModule, NbSelectModule, NbDialogModule } from '@nebular/theme';
import { AppLoginComponent } from './login/login.component';
import { AppRegisterComponent } from './register/register.component';
import { AppContrastComponent } from './register/contrast/contrast.component';
import { NgxMdModule } from 'ngx-md';

const PAGE_COMPONENT = [
  AppLoginComponent,
  AppRegisterComponent,
];

const CHILD_COMPONENT = [
  AppContrastComponent,
];

const NB_MODULES = [
  NbCardModule,
  NbDialogModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbAlertModule,
  NbCheckboxModule,
  AuthRoutingModule,
  NbAuthModule,
];

const BASE_MODULES = [CommonModule, FormsModule, RouterModule];

@NgModule({
  imports: [
    NbAuthModule.forRoot(),
    NbToastrModule.forRoot(),
    NgxMdModule.forRoot(),
    ...BASE_MODULES,
    ...NB_MODULES,
  ],
  declarations: [
    ...PAGE_COMPONENT,
    ...CHILD_COMPONENT,
  ],
  entryComponents: [
    ...CHILD_COMPONENT,
  ],
  providers: [
    ...NbDialogModule.forRoot().providers,
  ],
})
export class AuthModule {
}

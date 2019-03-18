import { NgModule } from '@angular/core';
import { AppProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbToastrModule, NbDialogModule, NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbAlertModule, NbCheckboxModule, NbSpinnerModule } from '@nebular/theme';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { ThemeModule } from '../@theme/theme.module';

const PAGE_COMPONENT = [
  UserComponent,
  AppProfileComponent,
];

const CHILD_COMPONENT = [

];

const NB_MODULES = [
  NbAlertModule,
  NbCardModule,
  NbDialogModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  NbCheckboxModule,
];

const BASE_MODULES = [CommonModule, FormsModule, RouterModule];

@NgModule({
  imports: [
    UserRoutingModule,
    ThemeModule,
    NbToastrModule.forRoot(),
    ...BASE_MODULES,
    ...NB_MODULES,
  ],
  declarations: [
    UserComponent,
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
export class UserModule {
}

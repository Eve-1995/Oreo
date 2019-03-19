// // import { NgModule } from '@angular/core';
// // import { AppProfileComponent } from './profile/profile.component';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { RouterModule } from '@angular/router';
// // import { NbToastrModule, NbDialogModule, NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbAlertModule, NbCheckboxModule, NbSpinnerModule } from '@nebular/theme';
// // import { UserComponent } from './user.component';
// // import { UserRoutingModule } from './user-routing.module';
// // import { ThemeModule } from '../@theme/theme.module';
// // import { AppResetPasswordComponent } from './reset-password/reset-password.component';
// // import { AppCollectionComponent } from './collection/collection.component';
// // import { AppCommentComponent } from './comment/comment.component';

// // const PAGE_COMPONENT = [
// //   UserComponent,
// //   AppProfileComponent,
// //   AppResetPasswordComponent,
// //   AppCollectionComponent,
// //   AppCommentComponent,
// // ];

// // const CHILD_COMPONENT = [
// // ];

// // const NB_MODULES = [
// //   NbAlertModule,
// //   NbCardModule,
// //   NbDialogModule,
// //   NbButtonModule,
// //   NbInputModule,
// //   NbSelectModule,
// //   NbSpinnerModule,
// //   NbCheckboxModule,
// // ];

// // const BASE_MODULES = [CommonModule, FormsModule, RouterModule];

// // @NgModule({
// //   imports: [
// //     UserRoutingModule,
// //     ThemeModule,
// //     NbToastrModule.forRoot(),
// //     ...BASE_MODULES,
// //     ...NB_MODULES,
// //   ],
// //   declarations: [
// //     UserComponent,
// //     ...PAGE_COMPONENT,
// //     ...CHILD_COMPONENT,
// //   ],
// //   entryComponents: [
// //     ...CHILD_COMPONENT,
// //   ],
// //   providers: [
// //     ...NbDialogModule.forRoot().providers,
// //   ],
// // })
// // export class UserModule {
// // }

// import { CommonModule } from '@angular/common';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule, NbCardModule, NbToastrModule, NbSelectModule, NbDialogModule, NbSpinnerModule } from '@nebular/theme';
// import { httpInterceptorProviders } from '../others/interceptor';
// import { UserComponent } from './user.component';
// import { AppProfileComponent } from './profile/profile.component';
// import { AppResetPasswordComponent } from './reset-password/reset-password.component';
// import { AppCollectionComponent } from './collection/collection.component';
// import { AppCommentComponent } from './comment/comment.component';
// import { UserRoutingModule } from './user-routing.module';
// import { ThemeModule } from '../@theme/theme.module';

// const PAGE_COMPONENT = [
//   UserComponent,
//   AppProfileComponent,
//   AppResetPasswordComponent,
//   AppCollectionComponent,
//   AppCommentComponent,
// ];

// const CHILD_COMPONENT = [
// ];

// const NB_MODULES = [
//   NbAlertModule,
//   NbCardModule,
//   NbDialogModule,
//   NbButtonModule,
//   NbInputModule,
//   NbSelectModule,
//   NbSpinnerModule,
//   NbCheckboxModule,
// ];

// const BASE_MODULES = [CommonModule, FormsModule, RouterModule];

// @NgModule({
//   imports: [
//     UserRoutingModule,
//     ThemeModule,
//     NbToastrModule.forRoot(),
//     ...BASE_MODULES,
//     ...NB_MODULES,
//   ],
//   declarations: [
//     ...PAGE_COMPONENT,
//     ...CHILD_COMPONENT,
//   ],
//   entryComponents: [
//     ...CHILD_COMPONENT,
//   ],
//   providers: [
//     httpInterceptorProviders,
//     ...NbDialogModule.forRoot().providers,
//   ]
// })
// export class UserModule {
// }
// import { NgModule } from '@angular/core';
// import { AppProfileComponent } from './profile/profile.component';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { NbToastrModule, NbDialogModule, NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbAlertModule, NbCheckboxModule, NbSpinnerModule } from '@nebular/theme';
// import { UserComponent } from './user.component';
// import { UserRoutingModule } from './user-routing.module';
// import { ThemeModule } from '../@theme/theme.module';
// import { AppResetPasswordComponent } from './reset-password/reset-password.component';
// import { AppCollectionComponent } from './collection/collection.component';
// import { AppCommentComponent } from './comment/comment.component';

// const PAGE_COMPONENT = [
//   UserComponent,
//   AppProfileComponent,
//   AppResetPasswordComponent,
//   AppCollectionComponent,
//   AppCommentComponent,
// ];

// const CHILD_COMPONENT = [
// ];

// const NB_MODULES = [
//   NbAlertModule,
//   NbCardModule,
//   NbDialogModule,
//   NbButtonModule,
//   NbInputModule,
//   NbSelectModule,
//   NbSpinnerModule,
//   NbCheckboxModule,
// ];

// const BASE_MODULES = [CommonModule, FormsModule, RouterModule];

// @NgModule({
//   imports: [
//     UserRoutingModule,
//     ThemeModule,
//     NbToastrModule.forRoot(),
//     ...BASE_MODULES,
//     ...NB_MODULES,
//   ],
//   declarations: [
//     UserComponent,
//     ...PAGE_COMPONENT,
//     ...CHILD_COMPONENT,
//   ],
//   entryComponents: [
//     ...CHILD_COMPONENT,
//   ],
//   providers: [
//     ...NbDialogModule.forRoot().providers,
//   ],
// })
// export class UserModule {
// }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule, NbCardModule, NbToastrModule, NbSelectModule, NbDialogModule, NbSpinnerModule } from '@nebular/theme';
import { httpInterceptorProviders } from '../others/interceptor';
import { UserComponent } from './user.component';
import { AppProfileComponent } from './profile/profile.component';
import { AppResetPasswordComponent } from './reset-password/reset-password.component';
import { AppCollectionComponent } from './collection/collection.component';
import { AppCommentComponent } from './comment/comment.component';
import { UserRoutingModule } from './user-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { NgxMdModule } from 'ngx-md';

const PAGE_COMPONENT = [
  UserComponent,
  AppProfileComponent,
  AppResetPasswordComponent,
  AppCollectionComponent,
  AppCommentComponent,
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
    NgxMdModule.forRoot(),
    ...BASE_MODULES,
    ...NB_MODULES,
  ],
  declarations: [
    ...PAGE_COMPONENT
  ],
  providers: [
    httpInterceptorProviders
  ],
})
export class UserModule {
}

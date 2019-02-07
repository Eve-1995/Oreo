import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent, NbAuthModule } from '@nebular/auth';
import { AppLoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: AppLoginComponent,
      },
    ],
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NbAuthModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}

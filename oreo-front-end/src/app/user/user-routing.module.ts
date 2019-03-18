import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { AppProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: AppProfileComponent },
      { path: '**', redirectTo: 'profile' },
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}

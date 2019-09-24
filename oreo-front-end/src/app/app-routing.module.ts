import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminGuard, LoginGuard } from './global/guard/guard';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'admin', loadChildren: 'app/pages/admin/admin.module#AdminModule', canActivateChild: [AdminGuard] },
  { path: 'user', loadChildren: 'app/pages/user/user.module#UserModule', canActivateChild: [LoginGuard] },
  { path: 'auth', loadChildren: 'app/pages/auth/auth.module#AuthModule' },
  { path: 'visit', loadChildren: 'app/pages/visit/visit.module#VisitModule' },
  { path: 'boss', loadChildren: 'app/pages/boss/boss.module#BossModule' },
  { path: '**', redirectTo: 'visit' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [
    AdminGuard,
    LoginGuard
  ]
})
export class AppRoutingModule { }

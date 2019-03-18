import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminGuard, AuthGuard, UserGuard } from './others/guard';
import { AppGlobalService } from './others/global.service';

const routes: Routes = [
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivateChild: [AdminGuard] },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule', canActivateChild: [UserGuard] },
  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule', canActivateChild: [AuthGuard] },
  { path: 'visit', loadChildren: 'app/visit/visit.module#VisitModule' },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: '**', redirectTo: 'visit' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [
    AdminGuard,
    AuthGuard,
    UserGuard,
    AppGlobalService,
  ],
})
export class AppRoutingModule {
}

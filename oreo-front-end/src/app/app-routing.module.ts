import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminGuard, UserGuard } from './others/guard';
import { AppGlobalService } from './others/global.service';

const routes: Routes = [
  { path: '', redirectTo: 'visit', pathMatch: 'full' },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivateChild: [AdminGuard] },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule', canActivateChild: [UserGuard] },
  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: 'visit', loadChildren: 'app/visit/visit.module#VisitModule' },
  { path: '**', redirectTo: 'visit' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [
    AdminGuard,
    UserGuard,
    AppGlobalService,
  ],
})
export class AppRoutingModule {
}

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminGuard, AuthGuard } from './others/guard';
import { AppGlobalService } from './others/global.service';

const routes: Routes = [
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivateChild: [AdminGuard] },
  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule', canActivateChild: [AuthGuard] },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: '**', redirectTo: 'user' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [
    AdminGuard,
    AuthGuard,
    AppGlobalService,
  ],
})
export class AppRoutingModule {
}

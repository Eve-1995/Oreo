import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminGuard, UserGuard } from './global/guard/guard';
import { AppGlobalService } from './global/service/global.service';

const routes: Routes = [
  { path: '', redirectTo: 'visit', pathMatch: 'full' },
  { path: 'admin', loadChildren: 'app/pages/admin/admin.module#AdminModule', canActivateChild: [AdminGuard] },
  { path: 'user', loadChildren: 'app/pages/user/user.module#UserModule', canActivateChild: [UserGuard] },
  { path: 'auth', loadChildren: 'app/pages/auth/auth.module#AuthModule' },
  { path: 'visit', loadChildren: 'app/pages/visit/visit.module#VisitModule' },
  // { path: 'markdown', loadChildren: 'app/pages/markdown/markdown.module#MarkdownModule' },
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

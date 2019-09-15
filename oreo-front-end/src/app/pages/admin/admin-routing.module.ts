import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AppClassificationComponent } from './classification/classification.component';
import { AppArticleComponent } from './article/article.component';
import { AppUserComponent } from './user/user.component';
import { AppFragmentComponent } from './fragment/fragment.component';
import { CreateOrEditArticleComponent } from './article/create/create-or-edit-article.component';

const routes: Routes = [
  // 之所以单独开个路由对象是因为不想依附在 AdminComponent 之下
  {
    path: 'create-or-edit',
    children: [
      { path: 'article', component: CreateOrEditArticleComponent }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'classification', pathMatch: 'full' },
      { path: 'classification', component: AppClassificationComponent },
      { path: 'article', component: AppArticleComponent },
      { path: 'user', component: AppUserComponent },
      { path: 'fragment', component: AppFragmentComponent },
      { path: '**', redirectTo: 'classification' },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }

export const adminRouteComponents = [
  AdminComponent,
  AppClassificationComponent,
  AppArticleComponent,
  AppUserComponent,
  AppFragmentComponent,
  CreateOrEditArticleComponent
];

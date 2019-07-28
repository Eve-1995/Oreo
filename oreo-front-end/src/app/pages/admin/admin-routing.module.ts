import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AppClassificationComponent } from './classification/classification.component';
import { AppArticleComponent } from './article/article.component';
import { AppUserComponent } from './user/user.component';
import { AppFragmentComponent } from './fragment/fragment.component';

const routes: Routes = [
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
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

export const adminRoutedComponents = [
  AdminComponent,
  AppClassificationComponent,
  AppArticleComponent,
  AppUserComponent,
  AppFragmentComponent
];

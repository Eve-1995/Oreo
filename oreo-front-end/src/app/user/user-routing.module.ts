import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { AppProfileComponent } from './profile/profile.component';
import { AppResetPasswordComponent } from './reset-password/reset-password.component';
import { AppCollectionComponent } from './collection/collection.component';
import { AppCommentComponent } from './comment/comment.component';
import { AppArticleDetailComponent } from '../common/module/article-detail/article-detail.component';
import { AppFragmentComponent } from './fragment/fragment.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: AppProfileComponent },
      { path: 'reset-password', component: AppResetPasswordComponent },
      { path: 'collection', component: AppCollectionComponent },
      { path: 'comment', component: AppCommentComponent },
      { path: 'article-detail', component: AppArticleDetailComponent },
      { path: 'fragment', component: AppFragmentComponent },
      { path: '**', redirectTo: 'profile' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

export const userRoutedComponents = [
  UserComponent,
  AppProfileComponent,
  AppResetPasswordComponent,
  AppCollectionComponent,
  AppCommentComponent
];

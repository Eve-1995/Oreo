import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbListModule, NbCardModule } from '@nebular/theme';
import { AppInfoComponent } from './info/info.component';
import { AppArticleComponent } from './article/article.component';

const NB_MODULES = [
  NbListModule,
  NbCardModule,
];

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'article', pathMatch: 'full' },
      { path: 'info', component: AppInfoComponent },
      { path: 'article', component: AppArticleComponent },
      { path: '**', redirectTo: 'article' },
    ],
  },
];


@NgModule({
  imports: [
    BASE_MODULES,
    RouterModule.forChild(routes),
    ...NB_MODULES,
  ],
  exports: [RouterModule],
  declarations: [
    AppInfoComponent,
    AppArticleComponent,
  ],
})
export class UserRoutingModule {
}

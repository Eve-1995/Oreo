import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMdModule } from 'ngx-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbListModule, NbCardModule } from '@nebular/theme';
import { VisitComponent } from './visit.component';
import { AppInfoComponent } from './info/info.component';
import { AppArticleComponent } from './article/article.component';
import { AppArticleDetailComponent } from './article-detail/article-detail.component';

const NB_MODULES = [
  NbListModule,
  NbCardModule,
];

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const routes: Routes = [
  {
    path: '',
    component: VisitComponent,
    children: [
      { path: '', redirectTo: 'article', pathMatch: 'full' },
      { path: 'info', component: AppInfoComponent },
      { path: 'article', component: AppArticleComponent },
      { path: 'article-detail', component: AppArticleDetailComponent },
      { path: '**', redirectTo: 'article' },
    ],
  },
];


@NgModule({
  imports: [
    BASE_MODULES,
    RouterModule.forChild(routes),
    NgxMdModule.forRoot(),
    ...NB_MODULES,
  ],
  exports: [RouterModule],
  declarations: [
    AppInfoComponent,
    AppArticleComponent,
    AppArticleDetailComponent,
  ],
})
export class VisitRoutingModule {
}

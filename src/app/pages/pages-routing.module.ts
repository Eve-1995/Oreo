import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbToastrModule,
  NbDialogModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { PagesComponent } from './pages.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppConfirmComponent } from './children/confirm/confirm.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDialogNameComponent } from './classification/dialog-name-prompt/dialog-name-prompt.component';
import { AppClassificationComponent } from './classification/classification.component';
import { AppArticleComponent } from './article/article.component';

const NB_MODULES = [
  NbCardModule,
  NbDialogModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  Ng2SmartTableModule, // not a part of NB,just for a convenience
];

const CHILD_COMPONENT = [
  AppConfirmComponent,
  AppDialogNameComponent,
];

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'classification', pathMatch: 'full' },
      { path: 'classification', component: AppClassificationComponent },
      { path: 'article', component: AppArticleComponent },
      { path: '**', redirectTo: 'classification' },
    ],
  },
];


@NgModule({
  imports: [
    BASE_MODULES,
    RouterModule.forChild(routes),
    NbToastrModule.forRoot(),
    ...NB_MODULES],
  exports: [RouterModule],
  declarations: [
    AppClassificationComponent,
    AppArticleComponent,
    ...CHILD_COMPONENT,
  ],
  entryComponents: [
    ...CHILD_COMPONENT,
  ],
  providers: [
  ...NbDialogModule.forRoot().providers,
  ],
})
export class PagesRoutingModule {
}

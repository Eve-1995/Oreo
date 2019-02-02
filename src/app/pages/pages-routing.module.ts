import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbCardModule,
  NbToastrModule,
  NbDialogModule,
  NbButtonModule,
  NbInputModule,
} from '@nebular/theme';
import { PagesComponent } from './pages.component';
import { AppIndexComponent } from './index/index.component';
import { AppIndex2Component } from './index2/index2.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppConfirmComponent } from './children/confirm/confirm.component';
import { AppDialogNameComponent } from './index/dialog-name-prompt/dialog-name-prompt.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const NB_MODULES = [
  NbCardModule,
  NbDialogModule,
  NbButtonModule,
  NbInputModule,
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
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: AppIndexComponent },
      { path: 'index2', component: AppIndex2Component },
      { path: '**', redirectTo: 'index' },
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
    AppIndexComponent,
    AppIndex2Component,
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

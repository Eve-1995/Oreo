import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AppIndexComponent } from './index/index.component';
import { AppIndex2Component } from './index2/index2.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    AppIndexComponent,
    AppIndex2Component,
  ],
})
export class PagesRoutingModule {
}

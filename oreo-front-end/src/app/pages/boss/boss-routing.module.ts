import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppGuessStarComponent } from './guess-star/guess-star.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'guess-star', pathMatch: 'full' },
      { path: 'guess-star', component: AppGuessStarComponent }
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
export class BossRoutingModule { }

export const bossRouteComponents = [
  AppGuessStarComponent
];

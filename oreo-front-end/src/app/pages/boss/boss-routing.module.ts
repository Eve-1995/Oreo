import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppGuessStarComponent } from './guess-star/guess-star.component';
import { AppGuessSongComponent } from './guess-song/guess-song.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'guess-star', pathMatch: 'full' },
      { path: 'guess-star', component: AppGuessStarComponent },
      { path: 'guess-song', component: AppGuessSongComponent }
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
  AppGuessStarComponent,
  AppGuessSongComponent
];

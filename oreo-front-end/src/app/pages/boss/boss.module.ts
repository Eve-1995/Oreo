import { NgModule } from '@angular/core';
import { BossRoutingModule, bossRouteComponents } from './boss-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { AppGuessSongMyFavoriteHeaderComponent } from './guess-song/guess-song-my-favorite-header/guess-song-my-favorite-header.component';
import { AppGuessSongMyFavoriteSongsComponent } from './guess-song/guess-song-my-favorite-songs/guess-song-my-favorite-songs.component';
import { AppGuessSongMenuListComponent } from './guess-song/guess-song-menu-list/guess-song-menu-list.component';
import { AppGuessSongProgressComponent } from './guess-song/guess-song-progress/guess-song-progress.component';
import { AppBossService } from './boss.service';


@NgModule({
  imports: [
    ThemeModule,
    BossRoutingModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    ...bossRouteComponents,
    AppGuessSongMyFavoriteHeaderComponent,
    AppGuessSongMyFavoriteSongsComponent,
    AppGuessSongMenuListComponent,
    AppGuessSongProgressComponent
  ],
  providers: [
    AppBossService
  ]
})
export class BossModule {
}

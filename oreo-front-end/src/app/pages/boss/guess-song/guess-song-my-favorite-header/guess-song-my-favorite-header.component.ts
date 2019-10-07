import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppBossService } from '../../boss.service';

@Component({
  selector: 'app-guess-song-my-favorite-header',
  templateUrl: './guess-song-my-favorite-header.component.html',
  styleUrls: ['guess-song-my-favorite-header.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class AppGuessSongMyFavoriteHeaderComponent implements OnInit {
  public mode = true; // true: 副歌模式, false: 完整模式

  public modeChange(): void {
    this.mode = !this.mode;
    this.bossService.modeChange$.next(this.mode);
  }

  constructor(
    private bossService: AppBossService
  ) { }

  ngOnInit(): void {

  }
}

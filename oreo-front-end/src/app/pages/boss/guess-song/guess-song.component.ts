import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppBossService } from '../boss.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-guess-song',
  templateUrl: './guess-song.component.html',
  styleUrls: ['guess-song.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class AppGuessSongComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  public playing = false; // 歌曲的播放状态

  public previous(): void {
    this.bossService.previousSong$.next();
  }

  public pauseOrPlay(): void {
    this.bossService.pauseOrPlay$.next(!this.playing);
  }

  public next(): void {
    this.bossService.nextSong$.next();
  }

  constructor(
    private bossService: AppBossService
  ) { }

  ngOnInit(): void {
    const element = document.querySelector('#nb-global-spinner');
    if (element) {
      element.remove();
    }
    const html = document.querySelector('html');
    html.style.overflow = 'hidden';

    this.bossService.pauseOrPlay$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      this.playing = v;
    });
  }
}

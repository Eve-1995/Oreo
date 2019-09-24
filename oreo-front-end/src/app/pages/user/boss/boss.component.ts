import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './boss.component.html',
  styleUrls: ['boss.component.scss']
})
export class AppBossComponent implements OnInit {
  public bossList = [
    {
      name: '看表情猜明星',
      link: 'guess-star'
    }
  ];

  public jump(link: string): void {
    window.open(`${window.location.origin}/boss/${link}`, '_blank');
  }

  ngOnInit(): void {
  }
}

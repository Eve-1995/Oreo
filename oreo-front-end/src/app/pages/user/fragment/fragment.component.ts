import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FragmentService } from './fragment.service';
import { AppGlobalService } from '../../../global/service/global.service';

@Component({
  templateUrl: './fragment.component.html',
  styleUrls: ['fragment.component.scss'],
  providers: [FragmentService],
})
export class AppFragmentComponent implements OnInit {
  public fragments = [{
    img: '../../../assets/images/fragment.jpg',
    title: '再次见你时, 发现了隐藏的秘密',
    subTitle: '四魂之玉 I'
  }, {
    img: '../../../assets/images/fragment.jpg',
    title: '爱要大声说出来',
    subTitle: '四魂之玉 II'
  }, {
    img: '../../../assets/images/fragment.jpg',
    title: '爱要大声说出来',
    subTitle: '四魂之玉 III'
  }];

  constructor(
    private router: Router,
    private appGlobalService: AppGlobalService,
    private fragmentService: FragmentService,
  ) { }

  ngOnInit(): void {
  }
}

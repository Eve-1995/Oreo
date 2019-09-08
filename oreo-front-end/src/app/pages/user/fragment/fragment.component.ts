import { Component, OnInit } from '@angular/core';
import { FragmentService } from './fragment.service';

@Component({
  templateUrl: './fragment.component.html',
  styleUrls: ['fragment.component.scss'],
  providers: [FragmentService],
})
export class AppFragmentComponent implements OnInit {
  public fragments = [];

  constructor(
    private fragmentService: FragmentService
  ) { }

  ngOnInit(): void {
    this.fragmentService.findAll().subscribe(v => {
      this.fragments = v;
      this.fragments.forEach(fragment => {
        fragment.img = '../../../assets/images/fragment.jpg';
      });
    });
  }
}

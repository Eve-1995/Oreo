import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { ResponseDTO } from '../../others/response.dto';
import { NbToastrService } from '@nebular/theme';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.scss'],
  providers: [ProfileService],
})
export class AppProfileComponent implements OnInit {
  constructor(
    private service: ProfileService,
    private toastrService: NbToastrService
  ) { }

  loading = true;
  user: any = {};
  submitted: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.toastrService.success('', null);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    this.service.getUser(user.id).subscribe(v => {
      this.user = v.data;
      localStorage.setItem('userInfo', JSON.stringify(this.user));
      this.loading = false;
    });
  }

  save() {
    this.submitted = true;
    this.service.save(this.user).subscribe((v: ResponseDTO) => {
      if (v.code === 200) {
        this.ngOnInit();
      }
      this.submitted = false;
    });
  }
}

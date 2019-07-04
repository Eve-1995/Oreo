import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistService } from './register.service';
import { ResponseDTO } from '../../others/response.dto';
import { NbDialogService } from '@nebular/theme';
import { AppContrastComponent } from './contrast/contrast.component';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['register.component.scss'],
  providers: [RegistService]
})
export class AppRegisterComponent {
  constructor(
    private router: Router,
    private service: RegistService,
    private dialogService: NbDialogService) { }
  user: any = {};
  submitted: boolean = false;
  moreInfo = false;
  register(): void {
    this.submitted = true;
    this.service.save(this.user).subscribe((v: { result: boolean }) => {
      console.log(v);
      if (v.result) {
        this.router.navigate(['/auth/login']);
      } else {
        this.submitted = false;
      }
    });
  }
  checkContrast() {
    this.dialogService.open(AppContrastComponent);
  }
}

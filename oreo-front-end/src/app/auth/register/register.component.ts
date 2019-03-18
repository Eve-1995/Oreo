import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistService } from './register.service';
import { ResponseDTO } from '../../others/response.dto';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { AppContrastComponent } from './contrast/contrast.component';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['register.component.scss'],
  providers: [RegistService],
})
export class AppRegisterComponent {
  constructor(
    private router: Router,
    private service: RegistService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService) { }
  user: any = {};
  submitted: boolean = false;
  moreInfo = false;
  register(): void {
    this.submitted = true;
    this.service.save(this.user).subscribe((v: ResponseDTO) => {
      if (v.code === 200) {
        this.toastrService.success('', v.message);
        this.router.navigate(['/auth/login']);
      } else {
        this.toastrService.warning('', v.message);
        this.submitted = false;
      }
    });
  }
  checkContrast() {
    this.dialogService.open(AppContrastComponent);
  }
}

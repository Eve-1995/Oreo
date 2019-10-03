import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistService } from './register.service';
import { NbDialogService } from '@nebular/theme';
import { AppContrastComponent } from './contrast/contrast.component';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['register.component.scss'],
  providers: [RegistService]
})
export class AppRegisterComponent {
  public user: any = {};
  public submitted: boolean = false;
  public moreInfo = false;
  public redirectUrl = '';

  public register(): void {
    this.submitted = true;
    this.service.save(this.user).subscribe(() => {
      this.router.navigate(['/auth/login', { redirectUrl: this.redirectUrl }]);
    }, () => {
      this.submitted = false;
    });
  }

  public checkContrast() {
    this.dialogService.open(AppContrastComponent);
  }

  public loginHandler(): void {
    if (this.redirectUrl) {
      this.router.navigate(['/auth/login', { redirectUrl: this.redirectUrl }]);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: RegistService,
    private dialogService: NbDialogService
  ) {
    this.redirectUrl = this.activatedRoute.snapshot.paramMap.get('redirectUrl');
  }
}

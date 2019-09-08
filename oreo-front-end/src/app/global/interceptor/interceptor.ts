import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { TipType } from '../service/global.service';
import { AppSettingService } from '../service/setting.service';
import { Router } from '@angular/router';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private toastrService: NbToastrService,
    private router: Router,
    private settingService: AppSettingService
  ) { }
  server = environment.baseApi;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      url: this.server + req.url,
      setHeaders: { Authorization: `bearer ${localStorage.getItem('oreoToken')}` }
    });
    return next.handle(newReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.handleMessage(event.body.tipType, event.body.message);
        }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        console.log('catchError');
        if (err.status === 404) {
          this.toastrService.warning('这波问题很大...', '无法匹配到后端路由');
          return throwError(event);
        } else if (err.status === 401) { // token 验证失败, 跳往登录
          this.settingService.setUser(null);
          localStorage.removeItem('oreoToken');
          this.router.navigate(['auth/login']);
        }
        if (err.error) {
          this.handleMessage(err.error.tipType, err.error.message);
        }
        return throwError(event);
      })
    );
  }

  /**
   * 根据弹窗类型弹出不同的文本提示框
   * @param tipType 弹窗类型
   * @param message 提示文本
   */
  private handleMessage(tipType: number, message: string): void {
    switch (tipType) {
      case TipType.SUCCESS:
        this.toastrService.success('', message);
        break;
      case TipType.WARING:
        this.toastrService.warning('', message);
        break;
      case TipType.DANGER:
        this.toastrService.danger('', message);
        break;
      case TipType.INFO:
        this.toastrService.info('', message);
        break;
    }
  }
}

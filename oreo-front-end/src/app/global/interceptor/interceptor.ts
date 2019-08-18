import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap, catchError, mergeMap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { TipType, AppGlobalService } from '../service/global.service';
import { Router } from '@angular/router';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private toastrService: NbToastrService,
    private globalService: AppGlobalService,
    private router: Router
  ) { }
  server = environment.baseApi;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.globalService.userInfo) {
      this.globalService.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
    const newReq = req.clone({
      url: this.server + req.url,
      setHeaders: { Authorization: `bearer ${this.globalService.userInfo ? this.globalService.userInfo.token : null}` }
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
          // token 验证失败, 用于token过期
        } else if (err.status === 401) {
          this.globalService.userInfo = null;
          localStorage.removeItem('userInfo');
          this.globalService.logOut$.next();
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

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

enum TipType {
  success = 1,
  warning,
  danger,
  info
}
@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private toastrService: NbToastrService,
  ) { }
  server = environment.baseApi;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      url: this.server + req.url
    });
    return next.handle(newReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const tipType = event.body.tipType;
          // 存在tipType, 即需要弹窗提示, 反之则直接将请求转入业务层
          if (tipType) {
            this.handleTipType(tipType, event.body.message);
          }
          // event.status 是指http协议规定的状态码值
          if ([200, 201].includes(event.status)) {
            return of(new HttpResponse(Object.assign(event, { body: event.body })));
          }
        } else if (event instanceof HttpErrorResponse) {
          console.error('捕获错误响应');
          return throwError(event);
        }
      })
    );
  }

  /**
   * 根据弹窗类型弹出不同的文本提示框
   * @param tipType 弹窗类型
   * @param message 提示文本
   */
  private handleTipType(tipType: number, message: string): void {
    switch (tipType) {
      case TipType.success:
        this.toastrService.success('', message);
        break;
      case TipType.warning:
        this.toastrService.warning('', message);
        break;
      case TipType.danger:
        this.toastrService.danger('', message);
        break;
      case TipType.info:
        this.toastrService.info('', message);
        break;
    }
  }
}

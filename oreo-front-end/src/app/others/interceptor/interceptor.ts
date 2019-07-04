import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

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
          if ([200, 201].includes(event.status)) {
            if (event.body.code === 200) {
              // console.log('200');
              // console.log(event);
              // return of(new HttpResponse(Object.assign(event, { body: event.body.data })));
            }
          } else if (event.status === 210) { // 弹成功框
            this.toastrService.success('', event.body.message);
          } else {
            if (event.status === 211) { // 弹警告框
              this.toastrService.warning('', event.body.message);
            } else if (event.status === 212) { // 弹错误框
              this.toastrService.danger('', event.body.message);
            }
            // throwError是会中断请求避免进入业务层, 只要不是210都应该中断
            return throwError(event);
          }
          return of(new HttpResponse(Object.assign(event, { body: event.body.data })));
        } else if (event instanceof HttpErrorResponse) {
          console.error('捕获错误响应');
          return throwError(event);
        }
      })
    );
  }
}

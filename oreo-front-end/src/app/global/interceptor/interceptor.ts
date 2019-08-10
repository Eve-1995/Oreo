import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap, catchError, mergeMap } from 'rxjs/operators';
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
      url: this.server + req.url,
      setHeaders: {Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTY0OTI1NDgzLCJleHAiOjE1NjUwMTE4ODN9.GO-8ZeFTBJEROnDllrasrZ6yvbDEMTYTEWAJ2CbuZCc'}
    });
    return next.handle(newReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.handleMessage(event.body.tipType, event.body.message);
        }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        this.handleMessage(err.error.tipType, err.error.message);
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

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private toastrService: NbToastrService,
  ) { }
  server = environment.base_api;

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const newReq = req.clone({
      url: this.server + req.url
    });
    return next.handle(newReq).pipe(
      tap(e => {
        if (e instanceof HttpResponse) {
          if (e.body && e.body.code && e.body.message) {
            if (e.body.code === 200 || e.body.code === 201) {
              this.toastrService.success('', e.body.message);
            } else {
              // 想在这里拒绝掉
              this.toastrService.warning('', e.body.message);
            }
          }
        }
      })
    );
  }
}

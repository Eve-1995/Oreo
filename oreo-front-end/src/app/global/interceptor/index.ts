import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
];

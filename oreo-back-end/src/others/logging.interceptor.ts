import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// 暂时没用到
@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<{ code: number, data: any }> {
    return next.handle().pipe(map(v => {
      return {
        code: 200,
        data: v
      };
    }));
  }
}

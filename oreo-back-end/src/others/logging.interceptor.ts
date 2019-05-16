
// import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class LoggingInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     console.log('Before...');
//     console.log(context);
//     const now = Date.now();
//     return next
//       .handle();
//   }
// }


import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface ResponseDTO {
  code: 200 | 201 | 404 | 500 | 666;
  data: any;
}

@Injectable()
export class LoggingInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDTO> {
    const result: ResponseDTO = { code: null, data: null }
    return next.handle().pipe(map(v => {
      console.log(v);
      result.code = 200;
      result.data = v;
      return result;
    }));
  }
}
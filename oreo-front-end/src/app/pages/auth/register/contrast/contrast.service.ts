import { Injectable } from '@angular/core';

@Injectable()
export class ContrastService {
  getContrast(): string {
    return '放心, 不会拿你们的数据去撞库的, 真心没这个兴趣~';
  }
}

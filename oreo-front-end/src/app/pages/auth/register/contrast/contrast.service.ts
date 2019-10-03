import { Injectable } from '@angular/core';

@Injectable()
export class ContrastService {
  getContrast(): string {
    return '请放心, 你们的数据仅用来做数据存储~';
  }
}

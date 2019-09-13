import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VisitService {
  // 获取类别列表
  getMenu(): any {
    return this.httpClient.get('classification/findNames');
  }

  constructor(
    private httpClient: HttpClient
  ) { }
}

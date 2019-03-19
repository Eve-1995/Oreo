import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppArticleDetailService {
  constructor(private httpClient: HttpClient) { }
  findDetailById(id: number): any {
    return this.httpClient.get(`article/findDetailById/${id}`);
  }
}

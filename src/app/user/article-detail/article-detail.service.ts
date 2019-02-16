import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppArticleDetailService {
  constructor(private httpClient: HttpClient) { }
  server = 'http://localhost:3000/';
  findArticleById(id: number): any {
    return this.httpClient.get(`${this.server}article/findArticleById/${id}`);
  }
}

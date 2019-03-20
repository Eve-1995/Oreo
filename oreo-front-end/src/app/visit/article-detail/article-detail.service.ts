import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDTO } from '../../others/response.dto';

@Injectable()
export class AppArticleDetailService {
  constructor(private httpClient: HttpClient) { }
  findDetailById(id: number): any {
    return this.httpClient.get(`article/findDetailById/${id}`);
  }
  collect(id: number, articleId: number): ResponseDTO | any {
    const dto = { id, articleId };
    return this.httpClient.post(`user/collect`, dto);
  }
  actionStatus(id: any, articleId: any): ResponseDTO | any {
    const params = { id, articleId };
    return this.httpClient.get(`user/actionStatus`, { params });
  }
}

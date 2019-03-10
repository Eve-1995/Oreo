import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleClassificationDto } from './article.dto';

@Injectable()
export class ArticleService {
  constructor(private httpClient: HttpClient) { }
  server = 'http://localhost:3000/';
  findBasicInfoList(): any {
    return this.httpClient.get(`${this.server}article/findBasicInfoList`);
  }
  getClassificationNames(): any {
    return this.httpClient.get(`${this.server}classification/findNames`);
  }
  save(obj: ArticleClassificationDto): any {
    return this.httpClient.post(`${this.server}article/save`, obj);
  }
  delete(id: number): any {
    const body = {
      params: {
        id: id.toString(),
      },
    };
    return this.httpClient.delete(`${this.server}article/delete`, body);
  }
  findByFilter(name: string): any {
    if (typeof (name) === 'undefined') name = '';
    const params = { name };
    return this.httpClient.get(`${this.server}article/findByFilter`, { params });
  }
  findBasicInfo(id: any): any {
    const params = { id };
    return this.httpClient.get(`${this.server}article/findBasicInfo`, { params });
  }
}

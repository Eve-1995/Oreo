import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleClassificationDto } from './article.dto';

@Injectable()
export class ArticleService {
  constructor(private httpClient: HttpClient) { }
  findBasicInfoList(): any {
    return this.httpClient.get(`article/findBasicInfoList`);
  }
  getClassificationNames(): any {
    return this.httpClient.get(`classification/findNames`);
  }
  save(obj: ArticleClassificationDto): any {
    return this.httpClient.post(`article/save`, obj);
  }
  delete(id: number): any {
    const body = {
      params: {
        id: id.toString(),
      },
    };
    return this.httpClient.delete(`article/delete`, body);
  }
  findByFilter(name: string): any {
    if (typeof (name) === 'undefined') name = '';
    const params = { name };
    return this.httpClient.get(`article/findByFilter`, { params });
  }
  findBasicInfo(id: any): any {
    const params = { id };
    return this.httpClient.get(`article/findBasicInfo`, { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleClassificationDto } from './article.dto';

@Injectable()
export class ArticleService {
  constructor(private httpClient: HttpClient) { }

  findTableInfo(name?: string): any {
    if (name) {
      const params = { name };
      return this.httpClient.get(`article/findTableInfo`, { params });
    } else {
      return this.httpClient.get(`article/findTableInfo`);
    }
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
  findDetail(id: any): any {
    const params = { id };
    return this.httpClient.get(`article/findDetail`, { params });
  }
}

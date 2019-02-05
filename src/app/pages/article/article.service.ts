import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './article.dto';

@Injectable()
export class ArticleService {
  constructor(private httpClient: HttpClient) { }
  server = 'http://localhost:3000/';
  findBasicInfo(): any {
    return this.httpClient.get(`${this.server}article/findBasicInfo`);
  }
  getClassificationNames(): any {
    return this.httpClient.get(`${this.server}classification/findNames`);
  }
  findClassificationForFilter(): any {
    return this.httpClient.get(`${this.server}classification/findNamesForFilter`);
  }
  create(obj: Article): any {
    if (obj.classification.id === -1) {
      obj.classification = undefined;
    }
    return this.httpClient.post(`${this.server}article/create`, obj);
  }
  update(obj: Article): any {
    if (obj.classification.id === -1) {
      obj.classification = null;
    }
    console.log(obj);
    return this.httpClient.put(`${this.server}article/update`, obj);
  }
  delete(id: number): any {
    const body = {
      params: {
        id: id.toString(),
      },
    };
    return this.httpClient.delete(`${this.server}article/delete`, body);
  }
  findByFilter(name: string, classificationId: number): any {
    if (name === '') {
      name = 'undefined';
    }
    return this.httpClient.get(`${this.server}article/findByFilter/${classificationId}/${name}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Classification } from './index.dto';

@Injectable()
export class IndexService {
  constructor(private httpClient: HttpClient) { }
  server = 'http://localhost:3000/';
  getClassificationInfo(): any {
    return this.httpClient.get(`${this.server}classification/findAll`);
  }
  updateClassificationName(id: number, name: string): any {
    const obj = new Classification();
    obj.id = id;
    obj.name = name;
    return this.httpClient.put(`${this.server}classification/updateById`, obj);
  }
  deleteClassificationById(id: number): any {
    const body = {
      params: {
        id: id.toString(),
      },
    };
    return this.httpClient.delete(`${this.server}classification/deleteById`, body);
  }
  addClassification(name: string): any {
    const obj = new Classification();
    obj.name = name;
    obj.articleAmount = 0;
    obj.likeAmount = 0;
    obj.commentAmount = 0;
    return this.httpClient.post(`${this.server}classification/create`, obj);
  }
  findClassificationByName(name: string): any {
    if (name !== '') {
      return this.httpClient.get(`${this.server}classification/findByName/${name}`);
    } else {
      // 如果查找的关键字为空则查找全部数据
      return this.httpClient.get(`${this.server}classification/findAll`);
    }
  }
}

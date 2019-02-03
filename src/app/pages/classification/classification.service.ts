import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Classification } from './classification.dto';

@Injectable()
export class ClassificationService {
  constructor(private httpClient: HttpClient) { }
  server = 'http://localhost:3000/';
  findBasicInfo(): any {
    return this.httpClient.get(`${this.server}classification/findBasicInfo`);
  }
  updateClassificationName(id: number, name: string): any {
    const obj = new Classification();
    obj.id = id;
    obj.name = name;
    return this.httpClient.put(`${this.server}classification/updateById`, obj);
  }
  delete(id: number): any {
    const body = {
      params: {
        id: id.toString(),
      },
    };
    return this.httpClient.delete(`${this.server}classification/deleteById`, body);
  }
  create(name: string): any {
    const obj = new Classification();
    obj.name = name;
    return this.httpClient.post(`${this.server}classification/create`, obj);
  }
  findByName(name: string): any {
    if (name !== '' && name !== undefined) {
      return this.httpClient.get(`${this.server}classification/findByName/${name}`);
    } else {
      // 如果查找的关键字为空则查找全部数据
      return this.httpClient.get(`${this.server}classification/findBasicInfo`);
    }
  }
}

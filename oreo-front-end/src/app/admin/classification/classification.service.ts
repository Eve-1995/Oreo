import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Classification } from './classification.dto';

@Injectable()
export class ClassificationService {
  constructor(private httpClient: HttpClient) { }
  findBasicInfoList(): any {
    return this.httpClient.get(`classification/findBasicInfoList`);
  }
  delete(id: number): any {
    const body = {
      params: {
        id: id.toString(),
      },
    };
    return this.httpClient.delete(`classification/deleteById`, body);
  }
  save(obj: Classification): any {
    return this.httpClient.post(`classification/save`, obj);
  }
  findByFilter(name: string): any {
    if (typeof (name) === 'undefined') name = '';
    const params = { name };
    return this.httpClient.get(`classification/findByFilter`, { params });
  }
}

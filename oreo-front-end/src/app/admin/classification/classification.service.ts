import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateClassification } from './classification.dto';

@Injectable()
export class ClassificationService {
  constructor(private httpClient: HttpClient) { }
  findBasicInfoList(): any {
    return this.httpClient.get(`classification/findBasicInfoList`);
  }
  findDetail(id: number): any {
    const body = {
      params: {
        id: id.toString(),
      },
    };
    return this.httpClient.get(`classification/findDetail`, body);
  }
  delete(id: number): any {
    const body = {
      params: {
        id: id.toString(),
      },
    };
    return this.httpClient.delete(`classification/deleteById`, body);
  }
  save(obj: CreateClassification): any {
    return this.httpClient.post(`classification/save`, obj);
  }
  findByFilter(name: string): any {
    if (typeof (name) === 'undefined') name = '';
    const params = { name };
    return this.httpClient.get(`classification/findByFilter`, { params });
  }
}

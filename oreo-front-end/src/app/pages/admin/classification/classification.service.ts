import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateClassification } from './classification.dto';

@Injectable()
export class ClassificationService {
  constructor(private httpClient: HttpClient) { }

  findTableInfo(name?: string): any {
    if (name) {
      const params = { name };
      return this.httpClient.get(`classification/findTableInfo`, { params });
    } else {
      return this.httpClient.get(`classification/findTableInfo`);
    }
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
    return this.httpClient.delete(`classification/delete`, body);
  }
  save(obj: CreateClassification): any {
    return this.httpClient.post(`classification/save`, obj);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) { }
  findTableInfo(): any {
    return this.httpClient.get(`user/findTableInfo`);
  }
  findByFilter(name: string): any {
    if (typeof (name) === 'undefined') name = '';
    const params = { name };
    return this.httpClient.get(`user/findByFilter`, { params });
  }
  delete(id: number): any {
    const body = {
      params: {
        id: id.toString(),
      },
    };
    return this.httpClient.delete(`user/delete`, body);
  }
}

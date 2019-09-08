import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FragmentService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getCollections(id: any): any {
    const params = { id };
    return this.httpClient.get(`user/getCollections`, { params });
  }

  findAll(): Observable<any> {
    return this.httpClient.get(`fragment/findAll`);
  }
}

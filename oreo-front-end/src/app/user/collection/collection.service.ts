import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CollectionService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getCollections(id: any): any {
    const params = { id };
    return this.httpClient.get(`user/getCollections`, { params });
  }
}

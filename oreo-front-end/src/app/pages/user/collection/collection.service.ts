import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CollectionService {
  getCollections(): any {
    return this.httpClient.get(`user/getCollections`);
  }

  constructor(
    private httpClient: HttpClient
  ) { }
}

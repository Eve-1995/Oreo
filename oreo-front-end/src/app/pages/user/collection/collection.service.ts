import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CollectionService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getCollections(): any {
    return this.httpClient.get(`user/getCollections`);
  }
}

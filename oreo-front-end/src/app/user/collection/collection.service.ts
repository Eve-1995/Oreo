import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDTO } from '../../others/response.dto';

@Injectable()
export class CollectionService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getCollections(id: any): ResponseDTO | any {
    const params = { id };
    return this.httpClient.get(`user/getCollections`, { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDTO } from '../../others/response.dto';
import { User } from '../../auth/user.dto';

@Injectable()
export class ProfileService {
  constructor(private httpClient: HttpClient) { }
  server = 'http://localhost:3000/';
  getUser(id): ResponseDTO | any {
    const params = { id };
    return this.httpClient.get(`${this.server}user/getUser`, { params });
  }
  save(user: User): ResponseDTO | any {
    return this.httpClient.post(`${this.server}user/update`, user);
  }
}

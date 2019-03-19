import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.dto';
import { ResponseDTO } from '../../others/response.dto';

@Injectable()
export class RegistService {
  constructor(private httpClient: HttpClient) { }
  save(user: User): ResponseDTO | any {
    return this.httpClient.post(`user/save`, user);
  }
}

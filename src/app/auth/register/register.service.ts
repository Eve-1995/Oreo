import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.dto';
import { ResponseDTO } from '../../others/response.dto';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterService {
  constructor(private httpClient: HttpClient) { }
  server = 'http://localhost:3000/';
  register(user: User): Observable<ResponseDTO | any> {
    return this.httpClient.post(`${this.server}user/save`, user);
  }
}

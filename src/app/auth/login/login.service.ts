import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.dto';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) { }
  server = 'http://localhost:3000/';
  login(user: User): any {
    return this.httpClient.post(`${this.server}user/getUser`, user);
  }
}

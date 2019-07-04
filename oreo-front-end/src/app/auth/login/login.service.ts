import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.dto';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) { }
  login(user: User): any {
    return this.httpClient.post(`user/login`, user);
  }
}

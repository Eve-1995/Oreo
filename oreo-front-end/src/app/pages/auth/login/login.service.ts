import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.dto';

@Injectable()
export class LoginService {
  login(user: User): any {
    return this.httpClient.post(`auth/login`, user);
  }

  constructor(
    private httpClient: HttpClient
  ) { }
}

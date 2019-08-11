import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.dto';

@Injectable()
export class RegistService {
  constructor(private httpClient: HttpClient) { }

  save(user: User): any {
    return this.httpClient.post(`auth/save`, user);
  }
}

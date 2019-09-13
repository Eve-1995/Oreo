import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.dto';

@Injectable()
export class RegistService {
  save(user: User): any {
    return this.httpClient.post(`auth/save`, user);
  }

  constructor(
    private httpClient: HttpClient
  ) { }
}

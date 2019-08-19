import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../auth/user.dto';

@Injectable()
export class ProfileService {
  constructor(private httpClient: HttpClient) { }

  getUser(): any {
    return this.httpClient.get(`user/getUser`);
  }

  updateUser(user: User): any {
    return this.httpClient.post(`user/update`, user);
  }
}

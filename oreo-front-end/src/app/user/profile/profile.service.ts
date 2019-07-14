import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../auth/user.dto';

@Injectable()
export class ProfileService {
  constructor(private httpClient: HttpClient) { }

  getUser(id: string): any {
    const params = { id };
    return this.httpClient.get(`user/getUser`, { params });
  }

  save(user: User): any {
    return this.httpClient.post(`user/update`, user);
  }
}

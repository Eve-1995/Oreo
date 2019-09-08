import { Injectable } from '@angular/core';

export interface User {
  nickname: string;
  level: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {
  private _user: User;

  public setUser: (user: User) => void = (user) => this._user = user;
  get user(): User {
    return this._user;
  }
}

import { Injectable } from '@angular/core';

export interface UserCoreInfo {
  nickname: string;
  level: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {
  private _user: UserCoreInfo;

  public setUser: (user: UserCoreInfo) => void = (user) => this._user = user;

  get user(): UserCoreInfo {
    return this._user;
  }
}

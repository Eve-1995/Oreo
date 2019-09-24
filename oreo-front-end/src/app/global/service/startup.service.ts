import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingService, UserCoreInfo } from './setting.service';


/**
 * 用于应用启动时, 获取用户信息
 */
@Injectable()
export class StartupService {
  constructor(
    private httpClient: HttpClient,
    private settingService: AppSettingService
  ) { }

  load(): Promise<boolean> {
    if (localStorage.getItem('oreoToken')) {
      const userInfo$ = this.httpClient.get(`user/getUserInfoByToken`);
      return new Promise((resolve, _reject) => {
        userInfo$.subscribe((v: UserCoreInfo) => {
          this.settingService.setUser(v);
          resolve(true);
        },
          () => {
            resolve(true);
          });
      });
    } else {
      localStorage.setItem('unLogin', 'true');
      return new Promise((resolve, _reject) => {
        resolve(true);
      });
    }
  }
}

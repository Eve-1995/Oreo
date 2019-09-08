import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppGlobalService } from './global.service';
import { zip } from 'rxjs';


/**
 * 用于应用启动时, 获取用户信息
 */
@Injectable()
export class StartupService {
  constructor(
    private httpClient: HttpClient,
    private globalService: AppGlobalService
  ) { }

  load(): Promise<boolean> {
    const userInfo$ = this.httpClient.get(`user/getUserInfoByToken`);
    return new Promise((resolve, _reject) => {
      zip(userInfo$).subscribe(v => {
        resolve(true);
      },
        () => {
          resolve(true);
        });
    });
  }
}

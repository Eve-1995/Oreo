import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum TipType {
  SUCCESS = 1,
  WARING,
  DANGER,
  INFO
}

/**
 * 操作类API的返回格式
 */
export interface OperationDTO {
  tipType: TipType, // 文本提示类型
  message: string // 文本提示内容
}

export interface Auth {
  token: string,
  id: number,
  nickname: string,
  level: number
}

@Injectable()
export class AppGlobalService {
  /**
   *fix:当切换模块时,每次都会触发添加菜单操作.
   *reason:模块切换,而菜单组件未销毁,导致实例一直存在.
   *solution:利用全局service保存唯一状态来解决这个bug.
   */
  haveAddedMenu = false;
  /**
  *fix:修改用户昵称后,页面右上角昵称未变化
  *reason:资料修改页面与顶部不是同一个组件
  *solution:通过rxjs手动执行变更操作
  */
  watchUserInfo = new Subject();
  watchMask = new Subject();

  userInfo: Auth;
  refreshMaskState(state: boolean) {
    this.watchMask.next(state);
  }

  // 登出事件
  logOut$ = new Subject<void>();

}

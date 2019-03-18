import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobalService {
  /**
   *fix:当切换模块时,每次都会触发添加菜单操作.
   *reason:模块切换,而菜单组件未销毁,导致实例一直存在.
   *solution:利用全局service保存唯一状态来解决这个bug.
   */
  haveAddedMenu = false;
}

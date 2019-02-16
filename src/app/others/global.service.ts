import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobalService {
  /**
   *该变量是为解决菜单重复添加的bug,当切换模块时,每次都会触发添加菜单操作
   *而nb-menu并没有提供相应的API,暂时只能利用全局service保存唯一状态来解决这个bug
   *
   * @memberof AppGlobalService
   */
  haveAddedMenu = false;
}

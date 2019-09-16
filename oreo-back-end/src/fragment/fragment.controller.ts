
import { Get, Controller, Post, Body, Delete, Query, HttpException, UseGuards } from '@nestjs/common';
import { TipMessageDTO, TipType } from '../others/response.dto';
import { DeleteResult } from 'typeorm';
import { FragmentService } from './fragment.service';
import { Fragment } from './fragment.entity';
import { AdminGuard } from '../others/auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { RequestUser } from '../others/decorator';
import { User } from '../user/user.entity';

@Controller('fragment')
export class FragmentController {
  /**
   * @api {Post} /fragment/save 新增
   * @apiGroup Fragment
   *
   * @apiParam {String} name 碎片名称
   * @apiParam {String} describe 碎片描述
   * @apiParamExample {json} Request-Example
   * {
   *  "name": "只若初见",
   *  "describe": "如果时间定格, 就不会人走茶凉"
   * }
   *
   * @apiUse UniversalSuccessDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "添加成功"
   * }
   * @apiSuccess {String} message 提示文本
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "修改成功"
   * }
   *
   * @apiUse UniversalErrorDTO
   * @apiErrorExample  {json} Response-Example
   * {
   *   "tipType": "2",
   *   "message": "碎片名称不能重复"
   * }
   * @apiErrorExample  {json} Response-Example
   * {
   *   "tipType": "3",
   *   "message": "发生未知错误, 请私信博主错误信息([fragment, save])"
   * }
   */
  @Post('save')
  @UseGuards(AuthGuard(), AdminGuard)
  async save(@Body() dto: Fragment): Promise<TipMessageDTO> {
    let action: 'edit' | 'create' = 'create';
    if (dto.id) {
      action = 'edit';
    }
    let tipType: number;
    let message: string;
    await this.service.save(dto, action).then(v => {
      if (v) {
        tipType = TipType.SUCCESS;
        switch (action) {
          case 'edit':
            message = '修改成功';
            break;
          case 'create':
            message = '添加成功';
            break;
        }
      } else {
        tipType = TipType.WARING;
        message = '碎片名称不能重复';
      }
    }).catch(() => {
      throw new HttpException({
        tipType: TipType.DANGER,
        message: '发生未知错误, 请私信博主错误信息([fragment, save])'
      }, 500);
    });
    return { tipType, message };
  }

  // 出于安全考虑, 该API不对外开放.
  // @Post('saveUser')
  // async saveUser(@Body() dto: { fragmentId: number, userId: number }): Promise<TipMessageDTO> {
  //   let tipType: number;
  //   let message: string;
  //   await this.service.saveUser(dto.fragmentId, dto.userId).catch(() => {
  //     throw new HttpException({
  //       tipType: TipType.DANGER,
  //       message: '发生未知错误, 请私信博主错误信息([fragment, saveUser])'
  //     }, 500);
  //   });
  //   return { tipType, message };
  // }

  /**
   * @api {Delete} /fragment/delete 删除
   * @apiGroup Fragment
   *
   * @apiParam {String} id 碎片id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1",
   * }
   *
   * @apiUse UniversalSuccessDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "删除成功"
   * }
   *
   * @apiUse UniversalErrorDTO
   * @apiErrorExample  {json} Response-Example
   * {
   *   "tipType": "3",
   *   "message": "发生未知错误, 请私信博主错误信息([fragment, delete])"
   * }
   */
  @Delete('delete')
  @UseGuards(AuthGuard(), AdminGuard)
  async delete(@Query() request): Promise<TipMessageDTO> {
    let message: string;
    let tipType: number;
    await this.service.delete(request.id).then((v: DeleteResult) => {
      if (v.raw.affectedRows > 0) {
        tipType = TipType.SUCCESS;
        message = '删除成功';
      } else {
        throw new HttpException({
          tipType: TipType.DANGER,
          message: '发生未知错误, 请私信博主错误信息([fragment, delete])'
        }, 500);
      }
    });
    return { tipType, message };
  }

  /**
   * @api {Get} /fragment/findTableInfo 获取全部类别信息
   * @apiGroup Fragment
   *
   * @apiParam {String} [name] 类别名
   * @apiParamExample {json} Request-Example
   * {
   *  "name": "只若初见"
   * }
   *
   * @apiSuccess {Number} id 碎片id
   * @apiSuccess {Number} name 碎片名称
   * @apiSuccess {Number} describe 碎片描述
   * @apiSuccess {Number} usersAmount 已获取该碎片的用户数量
   * @apiUse TimeDTO
   * @apiSuccessExample  {json} Response-Example
   * [{
   *   "id": 1,
   *   "name": "只若初见",
   *   "describe": "如果时间定格, 就不会人走茶凉",
   *   "usersAmount": 0
   * }]
   */
  @Get('findTableInfo')
  @UseGuards(AuthGuard(), AdminGuard)
  async findTableInfo(@Query() query): Promise<Fragment[]> {
    const name = query.name;
    return name ? this.service.findTableInfo(name) : this.service.findTableInfo();
  }

  /**
   * @api {Get} /fragment/findAll 获取碎片列表
   * @description 该操作用于用户查看自己所获得的碎片大全
   * @apiGroup Fragment
   *
   * @apiSuccess {Number} describe 碎片描述
   * @apiSuccess {Number} got 是否已获得
   * @apiSuccess {Number} name 碎片名称
   * @apiSuccessExample  {json} Response-Example
   * [{
   *  "describe": 1,
   *  "got": "如果时间定格, 就不会人走茶凉",
   *  "name": "只若初见"
   * }]
   */
  @Get('findAll')
  @UseGuards(AuthGuard())
  async findAll(@RequestUser() user: User): Promise<Fragment[]> {
    return this.service.findAll(user.id);
  }

  /**
   * @api {Get} /fragment/findDetail 获取特定碎片信息
   * @apiGroup Fragment
   *
   * @apiParam {String} id 类别id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1",
   * }
   *
   * @apiSuccess {Number} id 碎片id
   * @apiSuccess {Number} name 碎片名称
   * @apiSuccess {Number} describe 碎片描述
   * @apiSuccess {Number} usersAmount 已获取该碎片的用户数量
   * @apiUse TimeDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *  "id": 1,
   *  "name": "只若初见",
   *  "describe": "如果时间定格, 就不会人走茶凉",
   *  "usersAmount": 0
   * }
   */
  @Get('findDetail')
  @UseGuards(AuthGuard(), AdminGuard)
  async findDetail(@Query() query): Promise<any> {
    return this.service.findDetail(query.id);
  }

  // 白送的彩蛋, 内测结束后会修改此彩蛋的获取方式
  @Get('easyEgg')
  @UseGuards(AuthGuard())
  async easyEgg(@RequestUser() user: User): Promise<TipMessageDTO> {
    let message: string;
    let tipType: number;
    const exist = await this.service.checkGotAlready('我正在看着你', user.id);
    if (exist) {
      tipType = TipType.WARING;
      message = '已获得该彩蛋, 请勿重复!';
      return { tipType, message };
    }
    await this.service.saveUser('我正在看着你', user.id).then(() => {
      tipType = TipType.SUCCESS;
      message = '恭喜你发现了彩蛋!快去个人中心看看吧~!';
    });
    return { tipType, message };
  }

  constructor(
    private readonly service: FragmentService
  ) { }
}

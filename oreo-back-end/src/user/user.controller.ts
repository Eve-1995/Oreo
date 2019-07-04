import { Controller, Get, Post, Body, Query, Delete, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ResponseDTO } from 'src/others/response.dto';
import { UserDTO } from '../../../common/interface/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService,
  ) { }

  @Get('findTableInfo')
  async findTableInfo(): Promise<ResponseDTO> {
    const result: ResponseDTO = { code: null, message: null, data: null }
    await this.service.findTableInfo().then(v => {
      result.code = 200;
      result.data = v;
    })
    return result;
  }

  @Get('findByFilter')
  async findByFilter(@Query() query): Promise<User[]> {
    const name = query.name;
    return name !== undefined ? this.service.findTableInfo(name) : this.service.findTableInfo();
  }

  @Post('save')
  async save(@Body() dto: User): Promise<void> {
    await this.service.save(dto).then(v => {
      throw new HttpException({
        message: '注册成功',
        data: {
          result: true
        }
      }, 210);
    }).catch(e => {
      console.log('into catch');
      let message;
      if (e.errno === 1062) {
        message = '手机号已存在';
      } else {
        message = '发生未知错误, 请私信博主具体情况';
        console.log(e);
      }
      throw new HttpException({
        message,
        data: {
          result: false
        }
      }, 211);
    })
  }

  // @Post('update')
  // async update(@Body() dto: User): Promise<ResponseDTO> {
  //   let result: ResponseDTO = { code: null, message: null, data: null }
  //   await this.save(dto).then(v => {
  //     result = v;
  //     if (v.code === 200) {
  //       result.message = '修改成功';
  //     }
  //   })
  //   return result
  // }

  @Delete('delete')
  async delete(@Query() request): Promise<any> {
    let result: ResponseDTO = { code: null, message: null, data: null }
    const res = await this.service.delete(request.id);
    if (res.raw.affectedRows > 0) {
      result.code = 200;
      result.message = '删除成功';
    } else {
      result.code = 500;
      result.message = '删除失败';
    }
    return result;
  }
  /**
   *
   * @api {post} /user/login 登陆
   * @apiGroup User
   *
   * @apiParam {String} phone 手机号
   * @apiParam {String} password 密码
   *
   * @apiSuccess {String} id 编号
   * @apiSuccess {String} nickname 用户名
   * @apiSuccess {String} createTime 创建时间
   * @apiSuccess {String} updateTime 更新时间
   * @apiSuccess {String} phone 手机号
   * @apiSuccess {String} password 密码
   * @apiSuccess {String} level 用户等级 0:普通用户 1:管理员
   * @apiSuccess {String} realname 用户名
   * @apiSuccess {String} email 邮箱
   * @apiSuccess {String} liveCity 居住城市
   * @apiSuccess {String} hometown 家乡
   * @apiSuccess {String} birth 生日
   * @apiSuccess {String} company 公司
   * @apiSuccess {String} univercity 大学
   * @apiSuccess {String} eduacation 教育程度
   * 
   * @apiError (Error 211) message 帐号或密码不正确
   * @apiError (Error 666) message 恭喜你获得[四魂之玉碎片I * 1]!
   *
   *
   */
  @Post('login')
  async login(@Body() user: User): Promise<UserDTO> {
    let result: UserDTO;
    if (user.phone && user.password) {
      await this.service.getUser(user).then((v: UserDTO) => {
        if (!v) {
          throw new HttpException({
            message: '帐号或密码不正确'
          }, 211);
        }
        result = v;
      })
    } else {
      throw new HttpException({
        message: '恭喜你获得[四魂之玉碎片I * 1]!'
      }, 666);
    }
    return result;
  }

  @Get('getUser')
  async getUser(@Query() query): Promise<any> {
    const result: ResponseDTO = { code: null, message: null, data: null }
    await this.service.getUser(query.id).then(v => {
      result.code = 200
      result.data = v
      if (v === undefined) {
        result.data = null;
      }
    })
    return result;
  }

  @Post('collect')
  async collect(@Body() dto: { userId: number, articleId: number }): Promise<any> {
    await this.service.collect(dto.userId, dto.articleId).then(v => {
      if (v) {
        throw new HttpException({
          message: '收藏成功'
        }, 210);
      } else {
        throw new HttpException({
          message: '取消收藏成功'
        }, 210);
      }
    })
  }

  @Post('like')
  async like(@Body() dto: { userId: number, articleId: number }): Promise<any> {
    await this.service.like(dto.userId, dto.articleId).then(v => {
      if (v) {
        throw new HttpException({
          message: '点赞成功'
        }, 210);
      } else {
        throw new HttpException({
          message: '取消点赞成功'
        }, 210);
      }
    })
  }

  @Get('actionStatus')
  async actionStatus(@Query() query): Promise<{ hasCollect: boolean, hasLike: boolean }> {
    let hasCollect: boolean;
    let hasLike: boolean;
    await this.service.hasCollect({ id: query.id, articleId: query.articleId }).then(v => {
      hasCollect = v ? true : false
    })
    await this.service.hasLike({ id: query.id, articleId: query.articleId }).then(v => {
      hasLike = v ? true : false
    })
    return { hasCollect, hasLike };
  }

  @Get('getCollections')
  async getCollections(@Query() query): Promise<any> {
    const result: ResponseDTO = { code: null, message: null, data: null }
    await this.service.getUserCollections(query.id).then(v => {
      result.code = 200
      result.data = v;
    })
    return result;
  }
}

import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ResponseDTO } from 'src/others/response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService,
  ) { }

  @Get('findBasicInfo')
  async findBasicInfo(): Promise<User[]> {
    return this.service.findBasicInfo();
  }

  @Post('save')
  async save(@Body() dto: User): Promise<ResponseDTO> {
    const result: ResponseDTO = { code: null, message: null, data: null }
    await this.service.save(dto).then(v => {
      result.code = 200
      result.message = '注册成功'
      result.data = { id: v.id }
    }).catch(e => {
      if (e.errno === 1062) {
        result.code = 500
        result.message = '手机号或邮箱已存在'
      }
    })
    return result
  }

  @Post('update')
  async update(@Body() dto: User): Promise<ResponseDTO> {
    let result: ResponseDTO = { code: null, message: null, data: null }
    await this.save(dto).then((v: ResponseDTO) => {
      result = v;
      if (v.code === 200) {
        result.message = '修改成功'
      }
    })
    return result
  }

  @Post('login')
  async login(@Body() user: User): Promise<any> {
    const result: ResponseDTO = { code: null, message: null, data: null }
    if (user.phone !== undefined && user.password !== undefined) {
      await this.service.getUser(user).then(v => {
        if (v === undefined) {
          result.code = 404
          result.message = '帐号或密码不正确'
        } else {
          result.code = 200
          result.message = `验证成功!欢迎你,${v.nickname}`
          result.data = v
        }
      })
    } else {
      result.code = 666
      result.message = '骚年,别玩火哦!(账号或密码缺失)'
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
  async collect(@Body() dto: { id: number, articleId: number }): Promise<ResponseDTO> {
    const result: ResponseDTO = { code: null, message: null, data: null }
    await this.service.collect(dto).then(v => {
      if (v) {
        result.code = 200
        result.message = '收藏成功'
      } else {
        result.code = 201
        result.message = '取消成功'
      }
    })
    return result
  }

  @Post('like')
  async like(@Body() dto: { id: number, articleId: number }): Promise<ResponseDTO> {
    const result: ResponseDTO = { code: null, message: null, data: null }
    await this.service.like(dto).then(v => {
      if (v) {
        result.code = 200
        result.message = '点赞成功'
      } else {
        result.code = 201
        result.message = '取消成功'
      }
    })
    return result
  }

  @Get('actionStatus')
  async actionStatus(@Query() query): Promise<any> {
    const result: ResponseDTO = { code: null, message: null, data: null }
    result.code = 200
    let hasCollect;
    let hasLike;
    await this.service.hasCollect({ id: query.id, articleId: query.articleId }).then(v => {
      hasCollect = v ? true : false
    })
    await this.service.hasLike({ id: query.id, articleId: query.articleId }).then(v => {
      hasLike = v ? true : false
    })
    result.data = { hasCollect, hasLike };
    return result;
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

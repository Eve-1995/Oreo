import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './dto/user.dto';
import { ResponseDTO } from 'src/others/response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) { }
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
      result.message = '修改成功'
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
}

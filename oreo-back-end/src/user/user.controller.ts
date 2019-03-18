import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
    }).catch(e => {
      if (e.errno === 1062) {
        result.code = 500
        result.message = '手机号或邮箱已存在'
      }
    })
    return result
  }
  @Post('login')
  async login(@Body() user: User): Promise<any> {
    const result: ResponseDTO = { code: null, message: null, data: null }
    await this.service.getUser(user).then(v => {
      if (v === undefined) {
        result.code = 404
        result.message = '帐号或密码不正确'
      } else {
        result.code = 200
        result.message = `验证成功!欢迎你,${v.nickname}`
        if (v.level === 0) {
          result.data = {
            role: 'user'
          }
        } else if (v.level === 1) {
          result.data = {
            role: 'admin'
          }
        }
      }
    })
    return result;
  }
}

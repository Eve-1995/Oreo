import { Controller, Body, Post, HttpException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { TipType } from 'src/others/response.dto';

@Controller('auth')
export class AuthController {
  /**
   * @api {Post} /auth/login 登陆
   * @apiGroup Auth
   *
   * @apiParam {String} phone 手机号
   * @apiParam {String} password 密码
   * @apiParamExample {json} Request-Example
   * {
   *  "phone": 123456789,
   *  "password": 123456789
   * }
   *
   * @apiSuccess {String} token 用户凭证
   * @apiSuccess {String} nickname 用户名
   * @apiSuccess {Number} level 用户类别 0:普通用户,1:管理员
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
   *   "nickname": "Eve",
   *   "level": 1
   * }
   *
   * @apiUse UniversalErrorDTO
   * @apiErrorExample  {json} Response-Example
   * {
   *   "tipType": "2",
   *   "message": "帐号或密码不正确"
   * }
   *
   * @apiUse UniversalErrorDTO
   * @apiErrorExample  {json} Response-Example
   * {
   *   "tipType": "4",
   *   "message": "恭喜你获得[四魂之玉碎片I * 1]!"
   * }
   */
  @Post('login')
  async login(@Body() user: User): Promise<any> {
    let result: User;
    if (user.phone && user.password) {
      await this.service.getUser(user).then((v: User) => {
        if (!v) {
          throw new HttpException({
            tipType: TipType.WARING,
            message: '帐号或密码不正确'
          }, 500);
        }
        result = v;
      });
      const token = await this.authService.createToken(result);
      return {
        token,
        nickname: result.nickname,
        level: result.level
      };
    } else if (user.phone && !user.password) {
      // 为该帐号发放奖励
      throw new HttpException({
        tipType: TipType.INFO,
        message: '恭喜你获得[四魂之玉碎片I * 1]!'
      }, 200);
    }
  }

  /**
   * @api {Post} /auth/save 注册
   * @apiGroup Auth
   *
   * @apiParam {String} nickname 昵称
   * @apiParam {String} phone 手机
   * @apiParam {String} password 密码
   * @apiParam {String} [email] 邮箱
   * @apiParam {String} [liveCity] 居住城市
   * @apiParam {String} [hometown] 家乡
   * @apiParam {String} [birth] 生日
   * @apiParam {String} [company] 公司
   * @apiParam {String} [univercity] 大学
   * @apiParam {String} [eduacation] 教育程度
   * @apiParamExample {json} Request-Example
   * {
   *  "nickname": "Eve",
   *  "phone": "123456789",
   *  "password": "huangmenji"
   * }
   *
   * @apiUse UniversalSuccessDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "注册成功"
   * }
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "2",
   *   "message": "手机号已存在"
   * }
   *
   * @apiUse UniversalErrorDTO
   * @apiErrorExample {json} Response-Example
   * {
   *   "tipType": "3",
   *   "message": "发生未知错误, 请私信博主错误信息([auth, save])"
   * }
   */
  @Post('save')
  async save(@Body() dto: User): Promise<any> {
    let tipType: number;
    let message: string;
    await this.service.save(dto).then(() => {
      tipType = TipType.SUCCESS;
      message = '注册成功';
    }).catch(e => {
      if (e.errno === 1062) {
        throw new HttpException({
          tipType: TipType.WARING,
          message: '手机号已存在'
        }, 500);
      } else {
        throw new HttpException({
          tipType: TipType.DANGER,
          message: '发生未知错误, 请私信博主错误信息([auth, save])'
        }, 500);
      }
    });
    return { tipType, message };
  }

  constructor(
    private service: UserService,
    private authService: AuthService
  ) { }
}

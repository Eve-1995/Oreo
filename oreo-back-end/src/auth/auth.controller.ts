import { Controller, Body, Post, HttpException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { User } from "src/user/user.entity";

@Controller('auth')
export class AuthController {
  constructor(
    private service: UserService,
    private authService: AuthService
  ) { }

  /**
   * @api {Post} /auth/login 登陆
   * @apiDescription 使用Postman等工具发送只带帐号不带密码的请求有彩蛋.
   * @apiGroup Auth
   *
   * @apiParam {String} phone 手机号
   * @apiParam {String} password 密码   
   * @apiParamExample {json} Request-Example   
   * {
   *  "phone": 177,
   *  "password": 177
   * }
   * 
   * @apiUse UserDTO
   * @apiSuccess {String} level 用户类别 0:普通用户,1:管理员
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "id": 1,
   *   "nickname": "Eve",
   *   "createTime": "2019-05-01T09:05:15.958Z",
   *   "updateTime": "2019-05-04T16:42:38.000Z",
   *   "phone": "177****4863",
   *   "level": "1",
   *   "realname": "前夕",
   *   "email": "948832626@qq.com",
   *   "liveCity": "上海",
   *   "hometown": "温州",
   *   "birth": "1995-09-17",
   *   "company": "上海易校信息科技有限公司",
   *   "univercity": "浙江水利水电学院",
   *   "eduacation": "本科"
   * }
   *  
   * @apiError (Error 400) {String} tipType 弹窗类型 1:成功 2:警告 3:危险 4:通知
   * @apiError (Error 400) {String} message 提示文本
   * @apiErrorExample  {json} Response-Example(400)
   * {
   *   "tipType": "2",
   *   "message": "帐号或密码不正确"
   * }
   * 
   * @apiError (Error 666) {String} tipType 弹窗类型 1:成功 2:警告 3:危险 4:通知
   * @apiError (Error 666) {String} message 提示文本
   * @apiErrorExample  {json} Response-Example(666)
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
            tipType: 2,
            message: '帐号或密码不正确'
          }, 400);
        }
        result = v;
      })
      const token = await this.authService.createToken(result);
      return {
        token,
        id: result.id,
        nickname: result.nickname,
        level: result.level
      }
    } else if (user.phone && !user.password) {
      // 为该帐号发放奖励
      throw new HttpException({
        tipType: 4,
        message: '恭喜你获得[四魂之玉碎片I * 1]!'
      }, 666);
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
   *  "phone": "17712345678",
   *  "password": "huangmenji"
   * }
   * 
   * @apiSuccess {String} tipType 弹窗类型 1:成功 2:警告 3:危险 4:通知
   * @apiSuccess {String} message 提示文本
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
   * @apiError {String} tipType 弹窗类型 1:成功 2:警告 3:危险 4:通知
   * @apiError {String} message 提示文本
   * @apiErrorExample {json} Response-Example
   * {
   *   "tipType": "3",
   *   "message": "发生未知错误, 请私信博主错误信息([user, save])"
   * }
   */
  @Post('save')
  async save(@Body() dto: User): Promise<any> {
    let tipType: number;
    let message: string;
    await this.service.save(dto).then(() => {
      tipType = 1
      message = '注册成功';
    }).catch(e => {
      if (e.errno === 1062) {
        throw new HttpException({
          tipType: 2,
          message: '手机号已存在'
        }, 500);
      } else {
        throw new HttpException({
          tipType: 3,
          message: '发生未知错误, 请私信博主错误信息([user, save])'
        }, 500);
      }
    })
    return { tipType, message };
  }
}
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
      return await this.authService.createToken(result);
    } else if (user.phone && !user.password) {
      // 为该帐号发放奖励
      throw new HttpException({
        tipType: 4,
        message: '恭喜你获得[四魂之玉碎片I * 1]!'
      }, 666);
    }
  }
}
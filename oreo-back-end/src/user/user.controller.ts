import { Controller, Get, Post, Body, Query, Delete, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ResponseDTO } from 'src/others/response.dto';
import { UserDTO } from '../../../common/interface/user.interface';

@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService
  ) { }

  /**
   * @api {get} /user/findTableInfo 获取全部用户信息
   * @apiDescription 包含个人信息以及点赞总数、收藏总数、评论总数.
   * @apiGroup User
   *
   * @apiUse UserDTO
   * @apiUse LCCAmountDTO
   * @apiSuccessExample  {json} Response-Example
   * [{
   *   "id": 1,
   *   "nickname": "Eve",
   *   "createTime": "2019-05-01T09:05:15.958Z",
   *   "updateTime": "2019-05-04T16:42:38.000Z",
   *   "phone": "177****4863",
   *   "realname": "前夕",
   *   "email": "948832626@qq.com",
   *   "liveCity": "上海",
   *   "hometown": "温州",
   *   "birth": "1995-09-17",
   *   "company": "上海易校信息科技有限公司",
   *   "univercity": "浙江水利水电学院",
   *   "eduacation": "本科",
   *   "likeAmount": 2,
   *   "collectAmount": 8,
   *   "commentAmount": 9
   * }]
   */
  @Get('findTableInfo')
  async findTableInfo(): Promise<ResponseDTO> {
    let result = undefined;
    await this.service.findTableInfo().then(v => {
      result = v;
    })
    return result;
  }

  /**
   * @api {get} /user/findByFilter 根据用户名查找用户
   * @apiDescription 包含个人信息以及点赞总数、收藏总数、评论总数.
   * @apiGroup User
   * 
   * @apiParam {number} name 用户名
   * @apiParamExample {json} Request-Example
   * {
   *  "name": "E"
   * }
   * 
   * @apiUse UserDTO
   * @apiUse LCCAmountDTO
   * @apiSuccessExample  {json} Response-Example
   * [{
   *   "id": 1,
   *   "nickname": "Eve",
   *   "createTime": "2019-05-01T09:05:15.958Z",
   *   "updateTime": "2019-05-04T16:42:38.000Z",
   *   "phone": "177****4863",
   *   "realname": "前夕",
   *   "email": "948832626@qq.com",
   *   "liveCity": "上海",
   *   "hometown": "温州",
   *   "birth": "1995-09-17",
   *   "company": "上海易校信息科技有限公司",
   *   "univercity": "浙江水利水电学院",
   *   "eduacation": "本科",
   *   "likeAmount": 2,
   *   "collectAmount": 8,
   *   "commentAmount": 9
   * }]
   */
  @Get('findByFilter')
  async findByFilter(@Query() query): Promise<User[]> {
    const name = query.name;
    return name !== undefined ? this.service.findTableInfo(name) : this.service.findTableInfo();
  }

  /**
   * @api {post} /user/save 注册
   * @apiGroup User
   *
   * @apiParam {string} nickname 昵称
   * @apiParam {string} phone 手机
   * @apiParam {string} password 密码
   * @apiParam {string} [email] 邮箱
   * @apiParam {string} [liveCity] 居住城市
   * @apiParam {string} [hometown] 家乡
   * @apiParam {string} [birth] 生日
   * @apiParam {string} [company] 公司
   * @apiParam {string} [univercity] 大学
   * @apiParam {string} [eduacation] 教育程度
   * @apiParamExample {json} Request-Example
   * {
   *  "nickname": "Eve",
   *  "phone": "17712345678",
   *  "password": "huangmenji"
   * }
   * 
   * @apiSuccess (Success 210) {string} message 提示文本
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "message": "注册成功"
   * }
   * 
   * @apiError (Error 211) {string} message 提示文本
   * @apiErrorExample  {json} Response-Example
   * {
   *   "message": "手机号已存在"
   * }
   * @apiErrorExample  {json} Response-Example
   * {
   *   "message": "发生未知错误, 请私信博主具体情况"
   * }
   */
  @Post('save')
  async save(@Body() dto: User): Promise<void> {
    await this.service.save(dto).then(() => {
      throw new HttpException({
        message: '注册成功',
      }, 210);
    }).catch(e => {
      let message = '';
      if (e.errno === 1062) {
        message = '手机号已存在';
      } else {
        message = '发生未知错误, 请私信博主具体情况';
        console.log(e);
      }
      throw new HttpException({
        message
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

  /**
   * @api {delete} /user/delete 删除
   * @apiDescription 该操作将触发级联删除, 如用户的收藏记录等一并删除.
   * @apiGroup User
   *
   * @apiParam {string} userId 用户id
   * @apiParamExample {json} Request-Example
   * {
   *  "userId": "1",
   * }
   * 
   * @apiSuccess (Success 210) {string} message 提示文本
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "message": "删除成功"
   * }
   * 
   * @apiError (Error 212) {string} message 提示文本
   * @apiErrorExample  {json} Response-Example
   * {
   *   "message": "删除失败"
   * }
   */
  @Delete('delete')
  async delete(@Query() request): Promise<void> {
    const res = await this.service.delete(request.id);
    if (res.raw.affectedRows > 0) {
      throw new HttpException({
        message: '删除成功'
      }, 210);
    } else {
      throw new HttpException({
        message: '删除失败'
      }, 212);
    }
  }

  /**
   * @api {post} /user/login 登陆
   * @apiDescription 使用Postman等工具发送只带帐号不带密码的请求有彩蛋.
   * @apiGroup User
   *
   * @apiParam {string} phone 手机号
   * @apiParam {string} password 密码   
   * @apiParamExample {json} Request-Example   
   * {
   *  "userId": 1,
   *  "articleId": 6
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
   * @apiError (Error 211) {string} message 提示文本
   * @apiErrorExample  {json} Response-Example
   * {
   *   "message": "帐号或密码不正确"
   * }
   * @apiError (Error 666) {string} message 提示文本
   * @apiErrorExample  {json} Response-Example
   * {
   *   "message": "恭喜你获得[四魂之玉碎片I * 1]!"
   * }
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
        delete result.password
      })
    } else if (user.phone && !user.password) {
      throw new HttpException({
        message: '恭喜你获得[四魂之玉碎片I * 1]!'
      }, 666);
    }
    return result;
  }

  
  /**
   * @api {get} /user/getUser 获取单个用户信息
   * @apiDescription 只获取用户实体信息
   * @apiGroup User
   *
   * @apiParam {string} id 用户id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1"
   * }
   * 
   * @apiUse UserDTO
   * @apiUse LCCAmountDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *  "id": 1,
   *  "nickname": "Eve",
   *  "createTime": "2019-05-01T09:05:15.958Z",
   *  "updateTime": "2019-05-04T16:42:38.000Z",
   *  "phone": "177****4863",
   *  "realname": "前夕",
   *  "email": "948832626@qq.com",
   *  "liveCity": "上海",
   *  "hometown": "温州",
   *  "birth": "1995-09-17",
   *  "company": "上海易校信息科技有限公司",
   *  "univercity": "浙江水利水电学院",
   *  "eduacation": "本科",
   *  "likeAmount": 2,
   *  "collectAmount": 8,
   *  "commentAmount": 9
   * }
   */
  @Get('getUser')
  async getUser(@Query() query): Promise<any> {
    let result = undefined;
    await this.service.getUser(query.id).then(v => {
      v ? result = v : result = null;
    })
    if(result) delete result.password;
    return result;
  }

  /**
   * @api {post} /user/collect 收藏文章
   * @apiDescription 若用户未收藏过此文章则执行收藏操作, 反之取消收藏
   * @apiGroup User
   *
   * @apiParam {number} userId 用户id
   * @apiParam {number} articleId 文章编号
   * @apiParamExample {json} Request-Example
   * {
   *  "userId": 1,
   *  "articleId": 6
   * }
   * 
   * @apiSuccess (Success 210) {string} message 提示文本
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "message": "收藏成功"
   * }
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "message": "取消收藏成功"
   * }
   */
  @Post('collect')
  async collect(@Body() dto: { userId: number, articleId: number }): Promise<any> {
    await this.service.collect(dto.userId, dto.articleId).then(v => {
      let message = '';
      if (v) {
        message = '收藏成功';
      } else {
        message = '取消收藏成功'
      }
      throw new HttpException({
        message: '收藏成功'
      }, 210);
    })
  }

  /**
   * @api {post} /user/collect 点赞文章
   * @apiDescription 若用户未点赞过此文章则执行点赞操作, 反之取消点赞
   * @apiGroup User
   *
   * @apiParam {number} userId 用户id
   * @apiParam {number} articleId 文章编号
   * @apiParamExample {json} Request-Example
   * {
   *  "userId": 1,
   *  "articleId": 6
   * }
   * 
   * @apiSuccess (Success 210) {string} message 提示文本
   * @apiSuccessExample  {json} 用户未点赞
   * {
   *   "message": "点赞成功"
   * }
   * @apiSuccessExample  {json} 用户已点赞
   * {
   *   "message": "取消点赞成功"
   * }
   */
  @Post('like')
  async like(@Body() dto: { userId: number, articleId: number }): Promise<any> {
    await this.service.like(dto.userId, dto.articleId).then(v => {
      let message = '';
      if (v) {
        message = '点赞成功'
      } else {
        message = '取消点赞成功'
      }
      throw new HttpException({
        message
      }, 210);
    })
  }

  /**
   * @api {get} /user/actionStatus 用户是否已对文章操作过
   * @apiDescription 获取用户是否已点赞、收藏过该文章
   * @apiGroup User
   *
   * @apiParam {string} id 用户id
   * @apiParam {string} articleId 文章id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1",
   *  "articleId": "6"
   * }
   * 
   * @apiSuccess (Success 210) {string} hasCollect 是否已收藏
   * @apiSuccess (Success 210) {string} hasLike 是否已点赞
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "hasCollect": true,
   *   "hasLike": true
   * }
   */
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

  /**
   * @api {get} /user/getCollections 获取用户的收藏集合
   * @apiGroup User
   *
   * @apiParam {string} id 用户id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1"
   * }
   * 
   * @apiSuccess {number} id 文章id
   * @apiSuccess {number} name 文章名
   * @apiUse LCCAmountDTO
   * @apiSuccessExample  {json} Response-Example
   * [{
   *   "id": 6,
   *   "name": "Angular从入门到放弃",
   *   "likeAmount": "2",
   *   "collectAmount": "9",
   *   "commentAmount": "8",
   * }]
   */
  @Get('getCollections')
  async getCollections(@Query() query): Promise<any> {
    let result = undefined;
    await this.service.getUserCollections(query.id).then(v => {
      result = v;
    })
    return result;
  }
}

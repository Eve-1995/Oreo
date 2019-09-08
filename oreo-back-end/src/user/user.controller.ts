import { Controller, Get, Post, Body, Query, Delete, HttpException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TipMessageDTO, TipType } from 'src/others/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestUser } from 'src/others/decorator';
import { AdminGuard } from 'src/others/auth.guard';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(
    private readonly service: UserService
  ) { }

  /**
   * @api {Get} /user/findTableInfo 获取全部用户信息
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
   *   "phone": "123456789",
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
  @UseGuards(AdminGuard)
  async findTableInfo(@Query() query): Promise<User[] | TipMessageDTO> {
    const name = query.name;
    return name ? this.service.findTableInfo(name) : this.service.findTableInfo();
  }

  /**
   * @api {Get} /user/findByFilter 根据用户名查找用户
   * @apiGroup User
   * 
   * @apiParam {Number} name 用户名
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
   *   "phone": "123456789",
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

  @Post('update')
  async update(@Body() dto: User, @RequestUser() user: User): Promise<any> {
    let message: string;
    let tipType: number;
    delete dto.phone; // 防止用户伪造请求修改手机
    dto.id = user.id;
    await this.service.save(dto).then(() => {
      message = '修改成功';
      tipType = TipType.SUCCESS;
    })
    return { message, tipType };
  }

  @Get('getUserInfoByToken')
  async getUserInfoByToken(@RequestUser() user: User): Promise<any> {
    return user;
  }
  /**
   * @api {Delete} /user/delete 删除
   * @apiDescription 该操作将触发级联删除, 如用户的收藏记录等一并删除.
   * @apiGroup User
   *
   * @apiParam {String} userId 用户id
   * @apiParamExample {json} Request-Example
   * {
   *  "userId": "1",
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
   *   "message": "发生未知错误, 请私信博主错误信息([user, delete])"
   * }
   */
  @Delete('delete')
  @UseGuards(AdminGuard)
  async delete(@Query() request): Promise<TipMessageDTO> {
    let message: string;
    let tipType: number;
    await this.service.delete(request.id).then(v => {
      if (v.raw.affectedRows > 0) {
        tipType = TipType.SUCCESS;
        message = '删除成功';
      }
    }).catch(() => {
      throw new HttpException({
        tipType: TipType.DANGER,
        message: '发生未知错误, 请私信博主错误信息([user, delete])'
      }, 500);
    })
    return { tipType, message };
  }

  /**
   * @api {Get} /user/getUser 获取登录用户信息
   * @apiGroup User
   * 
   * @apiUse UserDTO
   * @apiUse LCCAmountDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *  "id": 1,
   *  "nickname": "Eve",
   *  "createTime": "2019-05-01T09:05:15.958Z",
   *  "updateTime": "2019-05-04T16:42:38.000Z",
   *  "phone": "123456789",
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
  async getUser(@RequestUser() user: User): Promise<any> {
    let result = undefined;
    await this.service.getUserById(user.id).then(v => {
      v ? result = v : result = null;
    })
    if (result) delete result.password;
    return result;
  }

  /**
   * @api {Post} /user/collect 收藏文章
   * @apiDescription 若用户未收藏过此文章则执行收藏操作, 反之取消收藏
   * @apiGroup User
   *
   * @apiParam {Number} articleId 文章id
   * @apiParamExample {json} Request-Example
   * {
   *  "articleId": 6
   * }
   * 
   * @apiUse UniversalSuccessDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "收藏成功"
   * }
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "取消收藏成功"
   * }
   */
  @Post('collect')
  async collect(@Body() dto: { articleId: number }, @RequestUser() user: User): Promise<any> {
    let tipType: number;
    let message: string;
    await this.service.collect(user.id, dto.articleId).then((v: boolean) => {
      tipType = TipType.SUCCESS;
      message = v ? '收藏成功' : '取消收藏成功';
    })
    return { tipType, message }
  }

  /**
   * @api {Post} /user/like 点赞文章
   * @apiDescription 若用户未点赞过此文章则执行点赞操作, 反之取消点赞
   * @apiGroup User
   *
   * @apiParam {Number} articleId 文章id
   * @apiParamExample {json} Request-Example
   * {
   *  "articleId": 6
   * }
   * 
   * @apiUse UniversalSuccessDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "点赞成功"
   * }
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "取消点赞成功"
   * }
   */
  @Post('like')
  async like(@Body() dto: { articleId: number }, @RequestUser() user: User): Promise<any> {
    let tipType: number;
    let message: string;
    await this.service.like(user.id, dto.articleId).then((v: boolean) => {
      tipType = TipType.SUCCESS;
      message = v ? '点赞成功' : '取消点赞成功';
    })
    return { tipType, message }
  }

  /**
   * @api {Get} /user/actionStatus 用户与文章的关系
   * @apiDescription 获取用户是否已点赞、收藏过该文章
   * @apiGroup User
   *
   * @apiParam {String} articleId 文章id
   * @apiParamExample {json} Request-Example
   * {
   *  "articleId": "6"
   * }
   * 
   * @apiSuccess {String} hasCollect 是否已收藏
   * @apiSuccess {String} hasLike 是否已点赞
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "hasCollect": true,
   *   "hasLike": true
   * }
   */
  @Get('actionStatus')
  async actionStatus(@Query() query, @RequestUser() user: User): Promise<{ hasCollect: boolean, hasLike: boolean }> {
    let hasCollect: boolean;
    let hasLike: boolean;
    await this.service.hasCollect(user.id, query.articleId).then(v => {
      hasCollect = v ? true : false
    })
    await this.service.hasLike(user.id, query.articleId).then(v => {
      hasLike = v ? true : false
    })
    return { hasCollect, hasLike };
  }

  /**
   * @api {GMet} /user/getCollections 获取用户的收藏文章列表
   * @apiGroup User
   *
   * @apiParam {String} id 用户id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1"
   * }
   * 
   * @apiSuccess {Number} id 文章id
   * @apiSuccess {Number} name 文章名
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
  async getCollections(@RequestUser() user: User): Promise<any> {
    let result = undefined;
    await this.service.getUserCollections(user.id).then(v => {
      result = v;
    })
    return result;
  }
}

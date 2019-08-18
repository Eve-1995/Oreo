import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TipMessageDTO, TipType } from 'src/others/response.dto';
import { Comment } from './comment.entity';
import { FragmentService } from 'src/fragment/fragment.service';
import { RequestUser } from 'src/others/decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly fragmentService: FragmentService,
    private readonly service: CommentService,
  ) { }

  /**
   * @api {Post} /comment/save 添加评论
   * @apiGroup Comment
   *
   * @apiParam {String} content 留言内容
   * @apiParam {Object} article 文章
   * @apiParam {Number} article.id 文章id
   * @apiParam {Object} [parentComment] 回复的父评论
   * @apiParam {Number} [parentComment.id] 父评论id
   * @apiParam {Object} [rootComment] 回复的祖先评论
   * @apiParam {Number} [rootComment.id] 祖先评论id
   * @apiParamExample {json} Request-Example
   * {
   *  "content":"上海志愿者大妈: 你是什么垃圾?!",
   *  "article":{
   *    "id": 6
   *  },
   *  "parentComment":{
   *    "id": 15
   *  },
   *  "rootComment":{
   *    "id": 16
   *  }
   * }
   * 
   * @apiUse UniversalSuccessDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "评论成功"
   * }
   */
  @Post('save')
  @UseGuards(AuthGuard())
  async save(@Body() dto: Comment, @RequestUser() user: User): Promise<TipMessageDTO> {
    let message: string;
    let tipType: number;
    // 彩蛋
    if (dto.content === '人工智能') {
      await this.fragmentService.saveUser(1, user.id).then(() => {
        tipType = TipType.SUCCESS;
        message = '恭喜你发现了彩蛋!快去个人中心看看吧~!';
      });
      return { tipType, message };
    } else {
      dto.user.id = user.id;
      await this.service.save(dto).then(() => {
        tipType = TipType.SUCCESS;
        message = '评论成功';
      });
      return { tipType, message };
    }
  }


  /**
   * @api {Get} /comment/getCommentsByArticle 获取文章的评论列表
   * @apiGroup Comment
   *
   * @apiParam {String} id 文章id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "6"
   * }
   * 
   * @apiSuccess {Number} id 评论id
   * @apiSuccess {String} content 评论内容
   * @apiSuccess {String} createTime 创建时间
   * @apiSuccess {Object} fromUser 创建祖先评论的用户
   * @apiSuccess {Number} fromUser.id 用户id
   * @apiSuccess {String} fromUser.nickname 用户昵称
   * @apiSuccess {String} fromUser.level 用户类别 0:普通用户,1:管理员
   * @apiSuccess {Object[]} children 回复该条评论的评论集合
   * @apiSuccess {Number} children.id 评论id
   * @apiSuccess {String} children.content 评论内容
   * @apiSuccess {String} children.createTime 创建时间
   * @apiSuccess {Object} fromUser 回复者
   * @apiSuccess {Number} fromUser.id 用户id
   * @apiSuccess {String} fromUser.nickname 用户昵称
   * @apiSuccess {String} fromUser.level 用户类别 0:普通用户,1:管理员
   * @apiSuccess {Object} toUser 被回复者
   * @apiSuccess {Number} toUser.id 用户id
   * @apiSuccess {String} toUser.nickname 用户昵称
   * @apiSuccess {String} toUser.level 用户类别 0:普通用户,1:管理员
   * @apiSuccess {Number} rootCommentId 祖先评论id
   * 
   * @apiSuccessExample  {json} Response-Example
    [{
      "id": 13,
      "content": "第一篇文章收藏量有点高啊。。",
      "createTime": "2019-05-04T16:21:40.187Z",
      "fromUser":
      {
          "id": 16,
          "nickname": "周家有女",
          "level": 0
      },
      "children": [
        {
          "id": 42,
          "content": "2",
          "createTime": "2019-07-06T15:20:12.287Z",
          "fromUser":
          {
              "id": 1,
              "nickname": "Eve",
              "level": 1
          },
          "toUser":
          {
              "id": 16,
              "nickname": "周家有女",
              "level": 0
          },
          "rootCommentId": 13
        }
      ]
    }]
   */
  @Get('getCommentsByArticle')
  async getCommentsByArticle(@Query() query): Promise<any> {
    const temp = await this.service.getCommentsByArticle(query.id);
    const result = [];
    const rootArr = [];
    const unRootArr = [];
    temp.forEach(item => {
      item.rootComment ? unRootArr.push(item) : rootArr.push(item);
    });
    rootArr.forEach(item1 => {
      const obj = {
        id: item1.id,
        content: item1.content,
        createTime: item1.createTime,
        fromUser: {
          id: item1.user.id,
          nickname: item1.user.nickname,
          level: item1.user.level
        },
        children: []
      }
      unRootArr.forEach(item2 => {
        if (item2.rootComment) {
          if (item1.id == item2.rootComment.id) {
            const childObj = {
              id: item2.id,
              content: item2.content,
              createTime: item2.createTime,
              fromUser: {
                id: item2.user.id,
                nickname: item2.user.nickname,
                level: item2.user.level
              },
              toUser: {
                id: item2.parentComment.user.id,
                nickname: item2.parentComment.user.nickname,
                level: item2.parentComment.user.level
              },
              rootCommentId: item1.id
            }
            obj.children.push(childObj);
          }
        }
      });
      result.push(obj);
    });
    return result;
  }
}
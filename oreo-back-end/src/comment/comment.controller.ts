import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ResponseDTO } from 'src/others/response.dto';
import { Comment } from './comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService,
  ) { }

  @Post('save')
  async save(@Body() dto: Comment): Promise<ResponseDTO> {
    const result: ResponseDTO = { code: null, message: null, data: null }
    await this.service.save(dto).then(() => {
      result.code = 200;
      result.message = '评论成功';
    })
    return result;
  }
  @Get('getCommentsByArticle')
  async getCommentsByArticle(@Query() query): Promise<any> {
    const result: ResponseDTO = { code: null, message: null, data: null }
    const temp = await this.service.getCommentsByArticle(query.id);
    result.code = 200;
    result.data = [];
    const rootArr = [];
    const unRootArr = [];
    temp.forEach(item => {
      item.rootComment ? unRootArr.push(item) : rootArr.push(item);
    });
    rootArr.forEach(item1 => {
      const obj = {
        'id': item1.id,
        'content': item1.content,
        'createTime': item1.createTime,
        fromUser: {
          id: item1.user.id,
          nickname: item1.user.nickname,
          level: item1.user.level
        },
        'children': []
      }
      unRootArr.forEach(item2 => {
        if (item2.rootComment) {
          if (item1.id == item2.rootComment.id) {
            const childObj = {
              'id': item2.id,
              'content': item2.content,
              'createTime': item2.createTime,
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
              'fromUserId': item2.user.id,
              'userLevel': item2.user.level,
              'rootCommentId': item1.id
            }
            obj.children.push(childObj);
          }
        }
      });
      result.data.push(obj);
    });
    return result;
  }
}
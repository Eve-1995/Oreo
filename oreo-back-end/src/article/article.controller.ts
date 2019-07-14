
import { Get, Controller, Param, Post, Body, Delete, Query, HttpException } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { ClassificationWithArticlesAll, ClassificationWithArticles, ArticleBasicInfo } from '../../../common/interface/article.interface';
import { TipMessageDTO } from 'src/others/response.dto';
import { DeleteResult } from 'typeorm';
@Controller('article')
export class ArticleController {
  constructor(
    private readonly service: ArticleService) { }

  /**
   * @api {Post} /article/save 新增
   * @apiGroup Article
   *
   * @apiParam {String} name 文章名
   * @apiParam {String} content 内容
   * @apiParam {Object[]} [classifications] 类别
   * @apiParam {Number} [classifications.id] 类别id
   * @apiParamExample {json} Request-Example
   * {
   *  "name": "Typescript VS Javascript",
   *  "content": "其实本质是一样的"
   *  "classifications": [
   *    {
   *      "id": 5
   *    }
   *  ]
   * }
   * 
   * @apiSuccess {String} tipType 弹窗类型 1:成功 2:警告 3:危险 4:通知
   * @apiSuccess {String} message 提示文本
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "添加成功"
   * }
   * @apiSuccess {String} message 提示文本
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "修改成功"
   * }
   *  
   * @apiError (Error 500) {String} tipType 弹窗类型 1:成功 2:警告 3:危险 4:通知
   * @apiError (Error 500) {String} message 提示文本
   * @apiErrorExample  {json} Response-Example
   * {
   *   "tipType": "3",
   *   "message": "添加失败(错误码:0005)"
   * }
   */
  @Post('save')
  async save(@Body() dto: Article): Promise<TipMessageDTO> {
    const flag = dto.id ? true : false;
    let tipType: number;
    let message: string;
    await this.service.save(dto).then(v => {
      tipType = 1
      message = flag ? '修改成功' : '添加成功';
    }).catch(() => {
      throw new HttpException({
        tipType: 3,
        message: '添加失败(错误码:0005)'
      }, 500);
    });
    return { tipType, message };
  }

  /**
   * @api {Get} /article/findTableInfo 获取全部文章信息
   * @apiGroup Article
   *
   * @apiParam {String} [name] 文章名
   * @apiParamExample {json} Request-Example
   * {
   *  "name": "ng"
   * }
   * 
   * @apiSuccess {Number} id 类别id
   * @apiUse LCCAmountDTO
   * @apiSuccessExample  {json} Response-Example
   * [{
   *   "id": 1,
   *   "name": "C语言",
   *   "likeAmount": 16,
   *   "collectAmount": 22,
   *   "commentAmount": 22
   * }]
   */
  @Get('findTableInfo')
  async findTableInfo(@Query() query): Promise<Article[]> {
    const name = query.name;
    return name ? this.service.findTableInfo(name) : this.service.findTableInfo();
  }

  /**
   * @api {Delete} /classification/deleteById 删除
   * @apiGroup Article
   *
   * @apiParam {String} id 文章id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1",
   * }
   * 
   * @apiSuccess {String} tipType 弹窗类型 1:成功 2:警告 3:危险 4:通知
   * @apiSuccess {String} message 提示文本
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "删除成功"
   * }
   * 
   * @apiError (Error 500) {String} tipType 弹窗类型 1:成功 2:警告 3:危险 4:通知
   * @apiError (Error 500) {String} message 提示文本
   * @apiErrorExample  {json} Response-Example
   * {
   *   "tipType": "3",
   *   "message": "发生未知错误, 请私信博主错误码(错误码:0006)"
   * }
   */
  @Delete('delete')
  async delete(@Query() request): Promise<any> {
    await this.service.delete(request.id)
    let message: string;
    let tipType: number;
    await this.service.delete(request.id).then((v: DeleteResult) => {
      if (v.raw.affectedRows > 0) {
        tipType = 1;
        message = '删除成功';
      } else {
        throw new HttpException({
          tipType: 3,
          message: '发生未知错误, 请私信博主错误码(错误码:0006)'
        }, 500);
      }
    })
    return { tipType, message };
  }

  /**
   * @api {Get} /article/findByClassification 获取特定类别的文章列表
   * @apiGroup Article
   *
   * @apiParam {String} 1 类别id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1"
   * }
   * 
   * @apiSuccess {Number} name 类别名
   * @apiSuccess {Object} articles 文章列表
   * @apiSuccess {Object} articles.id 文章id
   * @apiSuccess {Object} articles.name 文章名
   * @apiSuccess {Object} articles.likeAmount 文章点赞总数
   * @apiSuccess {Object} articles.collectAmount 文章收藏总数
   * @apiSuccess {Object} articles.commentAmount 文章评论总数
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "name": "前端技巧",
   *   "articles": [{
   *      "id": 1,
   *      "name": "防抖与节流"
   *      "likeAmount": 1,
   *      "collectAmount": 2,
   *      "commentAmount": 3
   *   }]
   * }
   */
  @Get('findByClassification')
  async findByClassification(@Query() request): Promise<ClassificationWithArticles> {
    let name = '';
    const articles = [];
    await this.service.findListByClassification(request.id).then(v => {
      name = v.name;
      v.articles.forEach(item => {
        articles.push({
          id: item.id,
          name: item.name,
          likeAmount: item.likeUsers.length,
          collectAmount: item.users.length,
          commentAmount: item.comments.length,
        });
      });
    })
    return { name, articles };
  }

  /**
   * @api {Get} /article/findBasicInfo 查看文章内容
   * @apiDescription 用于查看文章详情, 所以还会返回三连信息
   * @apiGroup Article
   *
   * @apiParam {String} 1 类别id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1"
   * }
   * 
   * @apiSuccess {Number} id 文章id
   * @apiSuccess {String} name 文章名
   * @apiSuccess {String} content 文章内容
   * @apiUse LCCAmountDTO
   * @apiUse TimeDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "id": 1,
   *   "name": "SSR - Angular",
   *   "content": "SSR是服务端渲染的技术",
   *   "createTime": "2019-05-01T09:07:24.093Z",
   *   "updateTime": "2019-05-04T15:55:57.000Z",
   *   "likeAmount": 16,
   *   "collectAmount": 22,
   *   "commentAmount": 22
   * }
   */
  @Get('findBasicInfo')
  async findBasicInfo(@Query() request): Promise<ArticleBasicInfo> {
    const serviceData = await this.service.findDetailById(request.id);
    return {
      'id': serviceData.id,
      'name': serviceData.name,
      'createTime': serviceData.createTime,
      'updateTime': serviceData.updateTime,
      'content': serviceData.content,
      'likeAmount': serviceData.likeUsers.length,
      'collectAmount': serviceData.users.length,
      'commentAmount': serviceData.comments.length,
    };
  }

  /**
   * @api {Get} /article/findDetail 获取特定文章信息
   * @apiGroup Article
   *
   * @apiParam {String} 1 类别id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1"
   * }
   * 
   * @apiSuccess {Number} id 
   * @apiSuccess {String} name 文章名
   * @apiSuccess {String} keywords 文章关键词
   * @apiSuccess {String} content 文章内容
   * @apiUse TimeDTO
   * @apiSuccess {Object[]} classifications 类别
   * @apiSuccess {Number} classifications.id 类别id
   * @apiSuccess {String} classifications.name 类别名称
   * @apiSuccess {String} classifications.keywords 类别关键词
   * @apiSuccess {String} classifications.createTime 类别创建时间
   * @apiSuccess {String} classifications.updateTime 类别更新时间
   * @apiSuccessExample  {json} Response-Example
   * {
   *  "id": 1,
   *  "name": "SSR - Angular",
   *  "content": "SSR是服务端渲染的技术",
   *  "keywords": "SSR是服务端渲染的技术",
   *  "createTime": "2019-05-01T09:07:24.093Z",
   *  "updateTime": "2019-05-04T15:55:57.000Z",
   *  "classifications": [{
   *   "id": 1,
   *   "name": "Angular",
   *   "keywords": "Google",
   *   "createTime": "2019-05-01T09:07:24.093Z",
   *   "updateTime": "2019-05-04T15:55:57.000Z",
   *   }]
   * }
   */
  @Get('findDetail')
  async findDetail(@Query() query): Promise<any> {
    return await this.service.findBasicInfo(query.id);
  }

}

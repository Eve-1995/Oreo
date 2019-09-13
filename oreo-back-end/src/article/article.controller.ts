
import { Get, Controller, Post, Body, Delete, Query, HttpException, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { TipMessageDTO, TipType } from 'src/others/response.dto';
import { AdminGuard } from 'src/others/auth.guard';
import { AuthGuard } from '@nestjs/passport';
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
   * @apiUse UniversalSuccessDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "添加成功"
   * }
   * @apiUse UniversalSuccessDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "修改成功"
   * }
   *
   * @apiUse UniversalErrorDTO
   * @apiErrorExample  {json} Response-Example
   * {
   *   "tipType": "3",
   *   "message": "发生未知错误, 请私信博主错误信息([article, save])"
   * }
   */
  @Post('save')
  @UseGuards(AuthGuard(), AdminGuard)
  async save(@Body() dto: Article): Promise<TipMessageDTO> {
    const flag = dto.id ? true : false;
    let tipType: number;
    let message: string;
    await this.service.save(dto).then(v => {
      tipType = TipType.SUCCESS;
      message = flag ? '修改成功' : '添加成功';
    }).catch(() => {
      throw new HttpException({
        tipType: TipType.DANGER,
        message: '发生未知错误, 请私信博主错误信息([article, save])'
      }, 500);
    });
    return { tipType, message };
  }

  /**
   * @api {Get} /article/findTableInfo 获取全部文章信息
   * @apiDescription 用于[管理中心]的表格数据
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
  @UseGuards(AuthGuard(), AdminGuard)
  async findTableInfo(@Query() query): Promise<Article[]> {
    const name = query.name;
    return name ? this.service.findTableInfo(name) : this.service.findTableInfo();
  }

  /**
   * @api {Delete} /classification/delete 删除
   * @apiGroup Article
   *
   * @apiParam {String} id 文章id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1",
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
   *   "message": "发生未知错误, 请私信博主错误信息([article, delete])"
   * }
   */
  @Delete('delete')
  @UseGuards(AuthGuard(), AdminGuard)
  async delete(@Query() request): Promise<any> {
    await this.service.delete(request.id);
    let message: string;
    let tipType: number;
    await this.service.delete(request.id).then(() => {
      // 日了狗了, 无论有没有删除成功返回的受影响行数都是0, 只能曲线救国了
      // if (v.raw.affectedRows > 0) {
      //   tipType = 1;
      //   message = '删除成功';
      // } else {
      //   throw new HttpException({
      //     tipType: 3,
      //     message: '发生未知错误, 请私信博主错误信息([article, delete])'
      //   }, 500);
      // }
      this.service.findDetailById(request.id).then(v => {
        if (!v) {
          tipType = TipType.SUCCESS;
          message = '删除成功';
        } else {
          throw new HttpException({
            tipType: TipType.DANGER,
            message: '发生未知错误, 请私信博主错误信息([article, delete])'
          }, 500);
        }
      });
    });
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
  async findByClassification(@Query() request): Promise<any> {
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
    });
    return { name, articles };
  }

  /**
   * @api {Get} /article/findBasicInfo 查看文章内容
   * @apiDescription 查看文章详情时请求的接口
   * @apiGroup Article
   *
   * @apiParam {String} id 类别id
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
  async findBasicInfo(@Query() request): Promise<any> {
    const serviceData = await this.service.findDetailById(request.id);
    return {
      id: serviceData.id,
      name: serviceData.name,
      createTime: serviceData.createTime,
      updateTime: serviceData.updateTime,
      content: serviceData.content,
      likeAmount: serviceData.likeUsers.length,
      collectAmount: serviceData.users.length,
      commentAmount: serviceData.comments.length,
    };
  }

  /**
   * @api {Get} /article/findDetail 获取特定文章信息
   * @apiDescription 用于编辑文章, 与findBasicInfo有一定的重复, 后期考虑合二为一
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
  @UseGuards(AuthGuard(), AdminGuard)
  async findDetail(@Query() query): Promise<any> {
    return await this.service.findBasicInfo(query.id);
  }

}

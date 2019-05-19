
import { Get, Controller, Param, Post, Body, Delete, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { ClassificationWithArticlesAll, ClassificationWithArticles, ArticleBasicInfo } from '../../../common/interface/article.interface';
@Controller('article')
export class ArticleController {
  constructor(
    private readonly service: ArticleService) { }

  @Post('save')
  async save(@Body() dto: Article): Promise<Article> {
    return this.service.save(dto);
  }

  @Get('findBasicInfoList')
  async findBasicInfoList(): Promise<Article[]> {
    return await this.service.findBasicInfoList();
  }
  @Get('findTableInfo')
  async findTableInfo(): Promise<Article[]> {
    return await this.service.findTableInfo();
  }

  @Delete('delete')
  async delete(@Query() request): Promise<any> {
    await this.service.delete(request.id)
  }

  @Get('findByFilter')
  async findByFilter(@Query() query): Promise<Article[]> {
    const name = query.name;
    return name !== undefined ? this.service.findTableInfo(name) : this.service.findTableInfo();
  }

  @Get('findByClassification/:classificationId')
  async findByClassification(@Param() params): Promise<ClassificationWithArticles> {
    const temp: ClassificationWithArticlesAll = await this.service.findListByClassification(params.classificationId);
    const arr = [];
    temp.articles.forEach(item => {
      arr.push({
        id: item.id,
        name: item.name,
        likeAmount: item.likeUsers.length,
        collectAmount: item.users.length,
        commentAmount: item.comments.length,
      });
    });
    return {
      name: temp.name,
      articles: arr,
    };
  }
  /**
   * 返回文章信息以及收藏者数量
   * @param params 文章id
   */
  @Get('findDetailById/:id')
  async findDetailById(@Param() params): Promise<ArticleBasicInfo> {
    const serviceData = await this.service.findDetailById(params.id);
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
  @Get('findBasicInfo')
  async findBasicInfo(@Query() query): Promise<any> {
    return await this.service.findBasicInfo(query.id);
  }

}

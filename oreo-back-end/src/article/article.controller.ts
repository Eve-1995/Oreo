
import { Get, Controller, Param, Post, Body, Delete, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { ArticleClassificationDto } from './dto/article-classification.dto';
@Controller('article')
export class ArticleController {
  constructor(
    private readonly service: ArticleService) { }

  @Post('save')
  async save(@Body() dto: ArticleClassificationDto): Promise<Article> {
    return this.service.save(dto);
  }

  @Get('findBasicInfoList')
  async findBasicInfoList(): Promise<Article[]> {
    return await this.service.findBasicInfoList();
  }

  @Delete('delete')
  async delete(@Query() request): Promise<any> {
    await this.service.delete(request.id)
  }

  @Get('findByFilter')
  async findByFilter(@Query() query): Promise<Article[]> {
    const name = query.name;
    if (name != undefined) {
      return await this.service.findByName(name);
    } else {
      return await this.service.findBasicInfoList();
    }
  }

  @Get('findByClassification/:classificationId')
  async findByClassification(@Param() params): Promise<any> {
    const temp = await this.service.findListByClassification(params.classificationId);
    const result = {
      data: {
        articles: temp.articles,
        name: temp.name
      }
    }
    return result;
  }
  /**
   * 返回文章信息以及收藏者数量
   * @param params 文章id
   */
  @Get('findDetailById/:id')
  async findDetailById(@Param() params): Promise<any> {
    const temp = await this.service.findDetailById(params.id);
    temp.collectNumber = temp.users.length;
    delete temp.users;
    return temp
  }
  @Get('findBasicInfo')
  async findBasicInfo(@Query() query): Promise<any> {
    return await this.service.findBasicInfo(query.id);
  }

}

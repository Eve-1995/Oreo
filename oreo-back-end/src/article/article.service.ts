import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, Like } from 'typeorm';
import { Article } from './article.entity';
import { Classification } from 'src/classification/classification.entity';
import { ArticleClassificationDto } from './dto/article-classification.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Classification)
    private readonly classificationRepository: Repository<Classification> ) {
  }
  /**
   * 新增文章信息
   * @param article 文章的实体
   */
  async save(dto: ArticleClassificationDto): Promise<any> {
    let article = await this.articleRepository.save(dto);
    const classifications = await this.classificationRepository.findByIds(dto.classificationIds, { relations: ['articles'] });
    for (const classification of classifications) {
      if (!Array.isArray(classification.articles)) classification.articles = [];
      classification.articles.push(article);
      await this.classificationRepository.save(classification);
    }
  }
  /**
   * 查找文章的基本信息列表
   */
  async findBasicInfoList(): Promise<Article[]> {
    return await this.articleRepository.find();
  }
  /**
   * 查找文章的详细信息
   */
  async findBasicInfo(id: any): Promise<any> {
    return await this.articleRepository.findOne({
      where: { id },
      relations: ['classifications']
    });
  }
  /**
   * 根据id删除文章
   * @param id 文章id
   */
  async delete(id: number): Promise<any> {
    return await this.articleRepository.delete(id);
  }
  /**
   * 根据文章名查找(模糊查询)
   * @param name 文章名
   */
  async findByName(name: string): Promise<Article[]> {
    return await this.articleRepository.find({ name: Like(`%${name}%`) });
  }

  /**
   * 根据文章分类id查找文章列表
   * @param id 文章分类id
   */
  async findListByClassification(id: number): Promise<any> {
    return this.classificationRepository.findOne({
      relations: ['articles'],
      where: { id }
    })
  }
  // /**
  //  * 返回文章全部信息
  //  * @param id 文章id
  //  */
  // async findArticleById(id: number): Promise<Article> {
  //   return await this.articleRepository.findOne({
  //     where: { id }
  //   })
  // }
  /**
   * 返回文章的全部信息基本信息与收藏者列表
   * @param id 文章id
   */
  async findDetailById(id: number): Promise<any> {
    return await this.articleRepository.findOne({
      relations: ['users'],
      where: { id }
    })
  }
  
}

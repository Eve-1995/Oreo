import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Article } from './article.entity';
import { Classification } from 'src/classification/classification.entity';
import { ClassificationWithArticlesAll, ArticleBasicInfoAll } from '../../../common/interface/article.interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Classification)
    private readonly classificationRepository: Repository<Classification>) {
  }
  /**
   * 新增文章信息
   * @param article 文章的实体
   */
  async save(dto: Article): Promise<any> {
    let temp = await this.articleRepository.save(dto)
    let article = await this.articleRepository.findOne(temp.id, { relations: ['classifications'] })
    dto.classifications.forEach(v => {
      article.classifications.push(v);
    })
    await this.articleRepository.save(article);
  }
  /**
   * 查找文章的基本信息列表
   */
  async findBasicInfoList(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  /**
   * 根据参数查找类别的关联信息
   * @param name 类别名称
   */
  async findTableInfo(name?: string): Promise<any> {
    const result = [];
    let articles: Article[] = [];
    const query = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.users', 'users')
      .leftJoinAndSelect('article.likeUsers', 'likeUsers')
      .leftJoinAndSelect('article.comments', 'comments')
    articles = await (name ? query.where(`article.name like '%${name}%'`).getMany() : query.getMany());
    articles.forEach(v => {
      result.push({
        id: v.id,
        name: v.name,
        likeAmount: v.likeUsers.length,
        collectAmount: v.users.length,
        commentAmount: v.comments.length
      })
    });
    return result;
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
  async findListByClassification(id: number): Promise<ClassificationWithArticlesAll | any> {
    return await this.classificationRepository
      .createQueryBuilder('classification')
      .where('classification.id = :id', { id })
      .leftJoinAndSelect('classification.articles', 'article')
      .leftJoinAndSelect('article.comments', 'comment')
      .leftJoinAndSelect('article.users', 'user')
      .leftJoinAndSelect('article.likeUsers', 'likeUsers')
      .getOne();
  }

  /**
   * 返回文章的全部信息基本信息与收藏者列表
   * @param id 文章id
   */
  async findDetailById(id: number): Promise<ArticleBasicInfoAll> {
    return await this.articleRepository.findOne({
      relations: ['users', 'likeUsers', 'comments'],
      where: { id }
    })
  }

}

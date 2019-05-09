import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, Like } from 'typeorm';
import { Classification } from './classification.entity';

@Injectable()
export class ClassificationService {
  constructor(
    @InjectRepository(Classification)
    private readonly classificationRepository: Repository<Classification>) { }

  async save(classification: Classification): Promise<Classification> {
    return this.classificationRepository.save(classification);
  }

  async findDetail(id: number): Promise<Classification> {
    return this.classificationRepository.findOne(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.classificationRepository.delete(id);
  }

  /**
   * 根据参数查找类别的关联信息
   * @param name 类别名称
   */
  async findTableInfo(name?: string): Promise<any> {
    const result = [];
    let classifications: Classification[] = [];
    const query = this.classificationRepository
      .createQueryBuilder('classification')
      .leftJoinAndSelect('classification.articles', 'articles')
      .leftJoinAndSelect('articles.users', 'users')
      .leftJoinAndSelect('articles.likeUsers', 'likeUsers')
      .leftJoinAndSelect('articles.comments', 'comments')
    classifications = await (name ? query.where(`classification.name like '%${name}%'`).getMany() : query.getMany());
    classifications.forEach(classification => {
      let likeAmount = 0;
      let collectAmount = 0;
      let commentAmount = 0;
      classification.articles.forEach(article => {
        likeAmount += article.likeUsers.length;
        collectAmount += article.users.length;
        commentAmount += article.comments.length;
      });
      result.push({
        id: classification.id,
        name: classification.name,
        articleAmount: classification.articles.length,
        likeAmount: likeAmount,
        collectAmount: collectAmount,
        commentAmount: commentAmount
      })
    });
    return result;
  }

  /**
   * 根据文章名查找(模糊查询)
   * @param name 文章名
   */
  async findByName(name: string): Promise<any> {
    const result = await this.classificationRepository.find({
      relations: ['articles'],
      where: { name: Like(`%${name}`) }
    });
    result.forEach(item => {
      item['articleAmount'] = item.articles.length;
      if (item.articles.length !== 0) {
        let commentAmount = 0;
        let likeAmount = 0;
        item.articles.forEach(articleItem => {
          // commentAmount += articleItem.commentAmount;
          // likeAmount += articleItem.likeAmount;
        });
        item['commentAmount'] = commentAmount;
        item['likeAmount'] = likeAmount;
      } else {
        item['commentAmount'] = 0;
        item['likeAmount'] = 0;
      }
      delete item.articles;
    });
    return result;
  }
  /**
   * 获取分类名称集合
   */
  async findNames(): Promise<Classification[]> {
    return await this.classificationRepository.find();
  }
  /**
   * 获取第一个分类的id
   */
  async findFirst(): Promise<{ id: number }> {
    return await this.classificationRepository.findOne({});
  }

}

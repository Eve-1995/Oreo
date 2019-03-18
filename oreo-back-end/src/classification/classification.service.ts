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

  async delete(id: number): Promise<DeleteResult> {
    return await this.classificationRepository.delete(id);
  }

  async findBasicInfoList(): Promise<any> {
    const result = await this.classificationRepository.find({ relations: ['articles'] });
    // 删去[文章]的对象,且将[文章]的好评数、点赞数等数据添加到[类别]对象上
    result.forEach(item => {
      item['articleAmount'] = item.articles.length;
      if (item.articles.length !== 0) {
        let commentAmount = 0;
        let likeAmount = 0;
        item.articles.forEach(articleItem => {
          commentAmount += articleItem.commentAmount;
          likeAmount += articleItem.likeAmount;
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
          commentAmount += articleItem.commentAmount;
          likeAmount += articleItem.likeAmount;
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
  async findFirst(): Promise<Classification[]> {
    return await this.classificationRepository.find({
      select: ['id'],
      take: 1
    });
  }

}

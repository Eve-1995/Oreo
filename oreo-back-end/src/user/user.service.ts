import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { User } from './user.entity';
import { Article } from 'src/article/article.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  /**
   * 收藏文章
   * @param dto 用户与文章id
   */
  async collect(dto: { id: number, articleId: number }): Promise<Boolean> {
    let user = await this.userRepository.findOne(dto.id, { relations: ['articles'] })
    let flag = false;
    const arr = [];
    // 算出不包含articleId的数组
    user.articles.forEach(v => {
      if (v.id === dto.articleId) {
        flag = true;
      } else {
        arr.push(v);
      }
    })
    if (flag) { // 说明已经存过,当前为取消收藏操作
      user.articles = arr;
      await this.userRepository.save(user);
      return false;
    } else { // 说明尚未存过,当前为执行收藏操作
      const article = new Article();
      article.id = dto.articleId
      user.articles.push(article);
      await this.userRepository.save(user);
      return true;
    }
  }
  async hasCollect(dto: { id: number, articleId: number }) {
    let user = await this.userRepository.findOne(dto.id, { relations: ['articles'] })
    let flag = false;
    user.articles.forEach(v => {
      if (v.id == dto.articleId) {
        flag = true;
      }
    })
    return flag;
  }
  async findBasicInfo(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async getUser(user: User): Promise<User> {
    return await this.userRepository.findOne(user);
  }
  /**
   * 返回该文章id被多少人收藏过
   * @param id 文章id
   */
  async getCollecNumberByArticleId(id: number): Promise<any> {
    const result = await this.userRepository.find({
      relations: ['articles']
    })
    let count = 0;
    result.forEach(item => {
      if (item.articles.length > 0) {
        item.articles.forEach(item2 => {
          if (item2.id == id) {
            count++;
          }
        });
      }
    });
    return count;
  }
}

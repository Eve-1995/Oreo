import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { Article } from 'src/article/article.entity';
import { UserDTO } from '../../../common/interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    // private articleService: ArticleService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  /**
   * 收藏文章或取消收藏文章
   * @param userId 用户id
   * @param articleId 文章id
   */
  async collect(userId: number, articleId: number): Promise<Boolean> {
    let user = await this.userRepository.findOne(userId, { relations: ['articles'] })
    let flag = false;
    const arr = [];
    // 算出不包含articleId的数组
    user.articles.forEach(v => {
      if (v.id === articleId) {
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
      article.id = articleId
      user.articles.push(article);
      await this.userRepository.save(user);
      return true;
    }
  }

  /**
   * 点赞文章
   * @param dto 用户与文章id
   */
  async like(userId: number, articleId: number): Promise<Boolean> {
    let user = await this.userRepository.findOne(userId, { relations: ['likeArticles'] })
    let flag = false;
    const arr = [];
    // 算出不包含articleId的数组
    user.likeArticles.forEach(v => {
      if (v.id === articleId) {
        flag = true;
      } else {
        arr.push(v);
      }
    })
    if (flag) { // 说明已经存过,当前为取消点赞操作
      user.likeArticles = arr;
      await this.userRepository.save(user);
      return false;
    } else { // 说明尚未存过,当前为执行点赞操作
      const article = new Article();
      article.id = articleId
      user.likeArticles.push(article);
      await this.userRepository.save(user);
      return true;
    }
  }

  async hasCollect(dto: { id: number, articleId: number }): Promise<Boolean> {
    let user = await this.userRepository.findOne(dto.id, { relations: ['articles'] })
    let flag = false;
    user.articles.forEach(v => {
      if (v.id == dto.articleId) {
        flag = true;
      }
    })
    return flag;
  }

  async hasLike(dto: { id: number, articleId: number }): Promise<Boolean> {
    let user = await this.userRepository.findOne(dto.id, { relations: ['likeArticles'] })
    let flag = false;
    user.likeArticles.forEach(v => {
      if (v.id == dto.articleId) {
        flag = true;
      }
    })
    return flag;
  }
  /**
   * 根据参数查找用户信息
   * @param name 用户昵称
   */
  async findTableInfo(name?: string): Promise<User[]> {
    const result = [];
    let users: User[] = [];
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.likeArticles', 'likeArticles')
      .leftJoinAndSelect('user.articles', 'articles')
      .leftJoinAndSelect('user.comments', 'comments')
    users = await (name ? query.where(`user.nickname like '%${name}%'`).getMany() : query.getMany());
    users.forEach(v => {
      result.push({
        id: v.id,
        nickname: v.nickname,
        createTime: v.createTime,
        updateTime: v.updateTime,
        phone: v.phone,
        realname: v.realname,
        email: v.email,
        liveCity: v.liveCity,
        hometown: v.hometown,
        birth: v.birth,
        company: v.company,
        univercity: v.univercity,
        eduacation: v.eduacation,
        likeAmount: v.likeArticles.length,
        collectAmount: v.articles.length,
        commentAmount: v.comments.length
      })
    });
    return result;
  }

  /**
   * 根据id删除文章
   * @param id 文章id
   */
  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async getUser(user: User): Promise<UserDTO> {
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
  /**
   * 查找用户的文章收藏列表
   * @param id 用户id
   */
  async getUserCollections(id: number): Promise<any> {
    const result = [];
    await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.articles', 'articles')
      .leftJoinAndSelect('articles.users', 'users')
      .leftJoinAndSelect('articles.likeUsers', 'likeUsers')
      .leftJoinAndSelect('articles.comments', 'comments')
      .getOne().then(v => {
        v.articles.forEach(article => {
          result.push({
            id: article.id,
            name: article.name,
            likeAmount: article.likeUsers.length,
            collectAmount: article.users.length,
            commentAmount: article.comments.length,
          })
        });
      })
    return result;
  }
}

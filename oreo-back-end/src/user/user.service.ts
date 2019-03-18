import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) { }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
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

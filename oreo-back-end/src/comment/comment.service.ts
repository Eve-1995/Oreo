import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  async save(dto: Comment): Promise<any> {
    await this.repository.save(dto);
  }

  /**
   * 根据id查找文章的评论
   * @param id '文章'id
   */
  async getCommentsByArticle(id: number): Promise<any> {
    return await this.repository
      .createQueryBuilder('comment')
      .where('article.id = :id', { id })
      .leftJoinAndSelect('comment.article', 'article')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.rootComment', 'rootComment')
      .leftJoinAndSelect('comment.parentComment', 'parentComment')
      .leftJoinAndSelect('parentComment.user', 'parentCommentUser')
      .getMany();
  }

  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>
  ) { }
}

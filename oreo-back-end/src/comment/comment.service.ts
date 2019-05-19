import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentDTO } from '../../../common/interface/comment.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>
  ) { }

  async save(dto: Comment): Promise<any> {
    await this.repository.save(dto);
  }

  /**
   * 根据id查找文章的评论
   * @param id '文章'id
   */
  async getCommentsByArticle(id: number): Promise<CommentDTO[] | any> {
    return await this.repository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.article', 'article')
      .where('article.id = :id', { id })
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.rootComment', 'rootComment')
      .leftJoinAndSelect('comment.parentComment', 'parentComment')
      .leftJoinAndSelect('parentComment.user', 'parentCommentUser')
      .getMany();
  }
}

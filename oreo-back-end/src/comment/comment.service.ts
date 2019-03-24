import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>
  ) { }
  async save(dto: Comment): Promise<any> {
    await this.repository.save(dto);
  }
  async getCommentsByArticle(id: number): Promise<any> {
    return await this.repository
      .createQueryBuilder("comment")
      .leftJoinAndSelect('comment.article', 'article')
      .where('article.id = :id', { id })
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.rootComment', 'rootComment')
      .leftJoinAndSelect('comment.parentComment', 'parentComment')
      .leftJoinAndSelect('parentComment.user', 'parentCommentUser')
      .getMany();
  }
}

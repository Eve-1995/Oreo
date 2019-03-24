import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentService],
    controllers: [CommentController],
})
export class CommentModule {
}

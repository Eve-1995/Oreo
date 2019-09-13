import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { Fragment } from 'src/fragment/fragment.entity';
import { PassportModule } from '@nestjs/passport';
import { FragmentModule } from 'src/fragment/fragment.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([Comment, Fragment]),
        forwardRef(() => FragmentModule)
    ],
    providers: [
        CommentService
    ],
    controllers: [
        CommentController
    ]
})
export class CommentModule { }

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { FragmentService } from 'src/fragment/fragment.service';
import { Fragment } from 'src/fragment/fragment.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([Comment, Fragment]),
        forwardRef(() => AuthModule)
    ],
    providers: [CommentService, FragmentService],
    controllers: [CommentController],
})
export class CommentModule {
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Classification } from 'src/classification/classification.entity';
import { User } from 'src/user/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Article, Classification, User])],
    providers: [ArticleService],
    controllers: [ArticleController],
})
export class ArticleModule {
}

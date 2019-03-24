import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificationModule } from './classification/classification.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ClassificationModule,
    ArticleModule,
    UserModule,
    CommentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      // logging: ["query"],
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'blog2',
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule { }

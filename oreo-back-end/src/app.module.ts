import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificationModule } from './classification/classification.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { FragmentModule } from './fragment/fragment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ClassificationModule,
    ArticleModule,
    UserModule,
    CommentModule,
    FragmentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      // logging: ["query"],
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'myblog',
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule { }

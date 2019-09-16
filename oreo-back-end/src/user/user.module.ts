import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { Article } from '../article/article.entity';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User, Article]),
    forwardRef(() => AuthModule)
  ],
  providers: [
    UserService
  ],
  controllers: [
    UserController
  ],
  exports: [
    UserService
  ]
})
export class UserModule { }

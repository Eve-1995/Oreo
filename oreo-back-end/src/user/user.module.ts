import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { Article } from 'src/article/article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Article])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {
}

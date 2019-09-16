import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FragmentService } from './fragment.service';
import { FragmentController } from './fragment.controller';
import { Fragment } from './fragment.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Fragment]),
    forwardRef(() => AuthModule)
  ],
  providers: [
    FragmentService
  ],
  controllers: [
    FragmentController
  ],
  exports: [
    FragmentService
  ]
})
export class FragmentModule { }

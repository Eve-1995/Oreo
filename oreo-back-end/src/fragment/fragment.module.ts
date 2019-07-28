import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FragmentService } from './fragment.service';
import { FragmentController } from './fragment.controller';
import { Fragment } from './fragment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fragment])],
  providers: [FragmentService],
  controllers: [FragmentController],
})
export class FragmentModule { }
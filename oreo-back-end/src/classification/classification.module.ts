import { Module } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { ClassificationController } from './classification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classification } from './classification.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Classification])],
    providers: [ClassificationService],
    controllers: [ClassificationController],
})
export class ClassificationModule {
}


import { Get, Controller, Post, Body, Delete, Put, Query } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { Classification } from './classification.entity';

@Controller('classification')
export class ClassificationController {
  constructor(private readonly service: ClassificationService) { }

  @Post('save')
  async save(@Body() dto: Classification): Promise<Classification> {
    return this.service.save(dto);
  }

  @Delete('deleteById')
  async deleteById(@Query() request): Promise<boolean> {
    const result: any = await this.service.delete(request.id);
    if (result.raw.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  }

  @Put('updateById')
  async updateById(@Body() params): Promise<Classification> {
    const classification = new Classification();
    classification.id = params.id;
    classification.name = params.name;
    return await this.service.save(classification);
  }

  @Get('findBasicInfoList')
  async findBasicInfoList(): Promise<Classification[]> {
    return this.service.findBasicInfoList();
  }

  // 用于表格编辑或新增时的下拉数据
  @Get('findNames')
  async findNames(): Promise<any[]> {
    return await this.service.findNames();
  }

  // 用于查找文章分类时的过滤选项
  @Get('findNamesForFilter')
  async findNamesForFilter(): Promise<any[]> {
    return await this.service.findNames();
  }

  @Get('findByFilter')
  async findByFilter(@Query() query): Promise<Classification[]> {
    const name = query.name;
    if (name != undefined) {
      return await this.service.findByName(name);
    } else {
      return await this.service.findBasicInfoList();
    }
  }

  @Get('findClassifications')
  async findClassifications(): Promise<Classification[]> {
    return await this.service.findNames();
  }

  @Get('findFirst')
  async findFirst(): Promise<{id:number}> {
    const data = await this.service.findFirst();
    return data[0];
  }
}

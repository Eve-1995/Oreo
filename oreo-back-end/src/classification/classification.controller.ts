
import { Get, Controller, Post, Body, Delete, Put, Query, UseInterceptors } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { Classification } from './classification.entity';
import { ResponseDTO } from 'src/others/response.dto';

@Controller('classification')
export class ClassificationController {
  constructor(private readonly service: ClassificationService) { }

  @Post('save')
  async save(@Body() dto: Classification): Promise<ResponseDTO> {
    const result: ResponseDTO = { code: null, message: null, data: null }
    await this.service.save(dto).then(v => {
      result.code = 200
      result.message = '添加成功'
    }).catch(() => {
      result.code = 500
      result.message = '添加失败'
    });
    return result;
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

  @Get('findTableInfo')
  async findTableInfo(): Promise<Classification[]> {
    return this.service.findTableInfo();
  }

  @Get('findDetail')
  async findDetail(@Query() query): Promise<any> {
    return this.service.findDetail(query.id);
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
    return name ? this.service.findTableInfo(name) : this.service.findTableInfo();
  }

  @Get('findClassifications')
  async findClassifications(): Promise<ResponseDTO> {
    const dto = new ResponseDTO();
    dto.data = await this.service.findNames();
    return dto;
  }

  @Get('findFirst')
  async findFirst(): Promise<ResponseDTO> {
    const dto = new ResponseDTO();
    dto.data = await this.service.findFirst();
    return dto;
  }
}

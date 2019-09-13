
import { Get, Controller, Post, Body, Delete, Query, HttpException } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { Classification } from './classification.entity';
import { TipMessageDTO, TipType } from 'src/others/response.dto';
import { DeleteResult } from 'typeorm';

@Controller('classification')
export class ClassificationController {
  /**
   * @api {Post} /classification/save 新增
   * @apiGroup Classification
   *
   * @apiParam {String} name 文章名
   * @apiParamExample {json} Request-Example
   * {
   *  "name": "Typescript VS Javascript",
   * }
   *
   * @apiUse UniversalSuccessDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "添加成功"
   * }
   * @apiSuccess {String} message 提示文本
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "修改成功"
   * }
   *
   * @apiUse UniversalErrorDTO
   * @apiErrorExample  {json} Response-Example
   * {
   *   "tipType": "3",
   *   "message": "发生未知错误, 请私信博主错误信息([classification, save])"
   * }
   */
  @Post('save')
  async save(@Body() dto: Classification): Promise<TipMessageDTO> {
    const flag = dto.id ? true : false;
    let tipType: number;
    let message: string;
    await this.service.save(dto).then(v => {
      tipType = TipType.SUCCESS;
      message = flag ? '修改成功' : '添加成功';
    }).catch((err) => {
      throw new HttpException({
        tipType: TipType.DANGER,
          message: '发生未知错误, 请私信博主错误信息([classification, save])'
      }, 500);
    });
    return { tipType, message };
  }

  /**
   * @api {Delete} /classification/delete 删除
   * @apiGroup Classification
   *
   * @apiParam {String} id 文章id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1",
   * }
   *
   * @apiUse UniversalSuccessDTO
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "tipType": "1",
   *   "message": "删除成功"
   * }
   *
   * @apiUse UniversalErrorDTO
   * @apiErrorExample  {json} Response-Example
   * {
   *   "tipType": "3",
   *   "message": "发生未知错误, 请私信博主错误信息([classification, delete])"
   * }
   */
  @Delete('delete')
  async delete(@Query() request): Promise<TipMessageDTO> {
    let message: string;
    let tipType: number;
    await this.service.delete(request.id).then((v: DeleteResult) => {
      if (v.raw.affectedRows > 0) {
        tipType = TipType.SUCCESS;
        message = '删除成功';
      } else {
        throw new HttpException({
          tipType: TipType.DANGER,
          message: '发生未知错误, 请私信博主错误信息([classification, delete])'
        }, 500);
      }
    });
    return { tipType, message };
  }

  /**
   * @api {Get} /classification/findTableInfo 获取全部类别信息
   * @apiGroup Classification
   *
   * @apiParam {String} [name] 类别名
   * @apiParamExample {json} Request-Example
   * {
   *  "name": "ng"
   * }
   *
   * @apiSuccess {Number} id 类别id
   * @apiSuccess {Number} articleAmount 文章总数
   * @apiUse LCCAmountDTO
   * @apiSuccessExample  {json} Response-Example
   * [{
   *   "id": 1,
   *   "name": "C语言",
   *   "articleAmount": 6,
   *   "likeAmount": 16,
   *   "collectAmount": 22,
   *   "commentAmount": 22
   * }]
   */
  @Get('findTableInfo')
  async findTableInfo(@Query() query): Promise<Classification[]> {
    const name = query.name;
    return name ? this.service.findTableInfo(name) : this.service.findTableInfo();
  }

  /**
   * @api {Get} /classification/findDetail 获取特定类别信息
   * @apiGroup Classification
   *
   * @apiParam {String} id 类别id
   * @apiParamExample {json} Request-Example
   * {
   *  "id": "1",
   * }
   *
   * @apiSuccess {Number} id 类别id
   * @apiUse TimeDTO
   * @apiSuccess {String} name 类别名
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "id": 1,
   *   "createTime": "2019-05-01T09:07:24.093Z",
   *   "updateTime": "2019-05-04T15:55:57.000Z",
   *   "name": "C语言",
   * }
   */
  @Get('findDetail')
  async findDetail(@Query() query): Promise<any> {
    return this.service.findDetail(query.id);
  }

  /**
   * @api {Get} /classification/findNames 获取类别名称
   * @apiGroup Classification
   *
   * @apiSuccess {Number} id 类别id
   * @apiUse TimeDTO
   * @apiSuccess {String} name 类别名
   * @apiSuccessExample  {json} Response-Example
   * [{
   *   "id": 1,
   *   "createTime": "2019-05-01T09:07:24.093Z",
   *   "updateTime": "2019-05-04T15:55:57.000Z",
   *   "name": "C语言",
   * }]
   */
  @Get('findNames')
  async findNames(): Promise<any[]> {
    return await this.service.findNames();
  }

  /**
   * @api {Get} /classification/findFirst 获取第一个类别
   * @apiGroup Classification
   *
   * @apiSuccess {Number} id 类别id
   * @apiUse TimeDTO
   * @apiSuccess {String} name 类别名
   * @apiSuccessExample  {json} Response-Example
   * {
   *   "id": 1,
   *   "createTime": "2019-05-01T09:07:24.093Z",
   *   "updateTime": "2019-05-04T15:55:57.000Z",
   *   "name": "C语言",
   * }
   */
  @Get('findFirst')
  async findFirst(): Promise<Classification> {
    return await this.service.findFirst();
  }

  constructor(
    private service: ClassificationService
  ) { }
}

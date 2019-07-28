import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Fragment } from './fragment.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class FragmentService {
  constructor(
    @InjectRepository(Fragment)
    private readonly repository: Repository<Fragment>
  ) { }

  async save(fragment: Fragment): Promise<Fragment> {
    return this.repository.save(fragment);
  }

  // 保存用户与碎片的关系
  async saveUser(dto: { fragmentId: number, userId: number }): Promise<any> {
    let fragments = await this.repository.findOne(dto.fragmentId, { relations: ['users'] })
    const exist = fragments.users.some(user => user.id === dto.userId);
    if (!exist) {
      const user = new User();
      user.id = dto.userId;
      fragments.users.push(user);
    }
    return await this.repository.save(fragments);
  }

  async findDetail(id: number): Promise<Fragment> {
    return this.repository.findOne(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  /**
   * 根据参数查找类别的关联信息
   * @param name 碎片名称或者碎片标题
   */
  async findTableInfo(name?: string): Promise<any> {
    const result = [];
    let fragment: Fragment[] = [];
    const query = this.repository
      .createQueryBuilder('fragment')
      .leftJoinAndSelect('fragment.users', 'users')
    fragment = await (name ? query.where(`fragment.name like '%${name}%'`).orWhere(`fragment.title like '%${name}%'`).getMany() : query.getMany());
    fragment.forEach(v => {
      result.push({
        id: v.id,
        name: v.name,
        title: v.title,
        createTime: v.createTime,
        updateTime: v.updateTime,
        usersAmount: v.users.length
      })
    });
    return result;
  }
}

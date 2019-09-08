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

  async save(fragment: Fragment, action: 'edit' | 'create'): Promise<boolean> {
    if (action === 'edit') {
      const findFragment = await this.repository.findOne({ name: fragment.name });
      if (findFragment) {
        return false;
      }
      await this.repository.save(fragment);
      return true;
    } else {
      await this.repository.save(fragment);
      return true;
    }
  }

  // 保存用户与碎片的关系
  async saveUser(fragmentName: string, userId: number): Promise<any> {
    const fragement = await this.repository.findOne({ name: fragmentName });
    const fragments = await this.repository.findOne(fragement.id, { relations: ['users'] });
    const exist = fragments.users.some(user => user.id === userId);
    if (!exist) {
      const user = new User();
      user.id = userId;
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
    let fragments: Fragment[] = [];
    const query = this.repository
      .createQueryBuilder('fragment')
      .leftJoinAndSelect('fragment.users', 'users')
    fragments = await (name ? query.where(`fragment.name like '%${name}%'`).orWhere(`fragment.describe like '%${name}%'`).getMany() : query.getMany());
    fragments.forEach(v => {
      result.push({
        id: v.id,
        name: v.name,
        describe: v.describe,
        createTime: v.createTime,
        updateTime: v.updateTime,
        usersAmount: v.users.length
      });
    });
    return result;
  }

  async findAll(id: number): Promise<Fragment[]> {
    const result = [];
    let fragments: Fragment[] = [];
    fragments = await this.repository
      .createQueryBuilder('fragment')
      .leftJoinAndSelect('fragment.users', 'users').getMany();
    fragments.forEach(v => {
      let got = true;
      if (v.users.findIndex(user => user.id === id) === -1) {
        got = false;
      }
      result.push({
        name: v.name,
        describe: v.describe,
        got
      });
    });
    return result;
  }
}

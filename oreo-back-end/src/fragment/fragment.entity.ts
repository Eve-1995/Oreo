import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Fragment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @Column({
    comment: '碎片名称'
  })
  name: string;

  @Column({
    comment: '碎片描述'
  })
  describe: string;

  @ManyToMany(type => User, user => user.fragments)
  users: User[];
}

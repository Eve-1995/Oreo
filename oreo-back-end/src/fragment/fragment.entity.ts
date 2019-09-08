import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, UpdateDateColumn } from 'typeorm';
import { Article } from 'src/article/article.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Fragment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @Column({
    comment: '碎片名称, 四魂之玉I'
  })
  name: string;

  @Column({
    comment: '标题, 爱要大声说出来'
  })
  describe: string;

  @ManyToMany(type => User, user => user.fragments)
  users: User[];
}
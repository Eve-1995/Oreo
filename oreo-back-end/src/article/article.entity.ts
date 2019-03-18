import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Classification } from 'src/classification/classification.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    @Column({
        type: 'text',
    })
    content: string;

    @Column({
        default: 0,
    })
    likeAmount: number;

    @Column({
        default: 0,
    })
    commentAmount: number;

    @ManyToMany(type => Classification, classification => classification.articles)
    classifications: Classification[];

    @ManyToMany(type => User, user => user.articles)
    users: User[];
}

import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Article } from 'src/article/article.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    @Column({
        unique: true,
        nullable: true
    })
    phone: string;

    @Column()
    password: string;

    @Column({
        default: 0,// 0表游客,1表管理员
    })
    level: number;

    @ManyToMany(type => Article, article => article.users)
    @JoinTable()
    articles: Article[];

    @Column({
        nullable: true
    })
    realname: string;

    @Column({
        unique: true,
        nullable: true
    })
    email: string;

    @Column({
        nullable: true
    })
    liveCity: string;

    @Column({
        nullable: true
    })
    hometown: string;

    @Column({
        nullable: true
    })
    birth: string;

    @Column({
        nullable: true
    })
    company: string;

    @Column({
        nullable: true
    })
    univercity: string;

    @Column({
        nullable: true
    })
    eduacation: string;
}
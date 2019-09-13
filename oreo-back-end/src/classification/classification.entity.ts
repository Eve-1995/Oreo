import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Article } from 'src/article/article.entity';

@Entity()
export class Classification {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    @Column()
    name: string;

    @ManyToMany(type => Article, article => article.classifications)
    @JoinTable()
    articles: Article[];
}

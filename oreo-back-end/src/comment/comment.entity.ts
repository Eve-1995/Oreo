import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createTime: Date;

    @Column()
    content: string;

    @ManyToOne(type => User, user => user.comments, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(type => Article, article => article.comments, { onDelete: 'CASCADE' })
    article: Article;

    @ManyToOne(type => Comment, comment => comment.parentComments, { onDelete: 'CASCADE' })
    parentComment: Comment;

    @OneToMany(type => Comment, comment => comment.parentComment)
    parentComments: Comment[];

    @ManyToOne(type => Comment, comment => comment.rootComments)
    rootComment: Comment;

    @OneToMany(type => Comment, comment => comment.rootComment)
    rootComments: Comment[];
}

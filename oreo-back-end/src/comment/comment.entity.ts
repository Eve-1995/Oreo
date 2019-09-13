import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Article } from 'src/article/article.entity';
import { User } from 'src/user/user.entity';

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

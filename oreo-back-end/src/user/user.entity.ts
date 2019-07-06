import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Article } from 'src/article/article.entity';
import { Comment } from 'src/comment/comment.entity';

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
        default: 0,
        comment: '用户类别 0:普通用户,1:管理员'
    })
    level: number;

    @Column({
        nullable: true
    })
    realname: string;

    @Column({
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

    @ManyToMany(type => Article, article => article.users)
    @JoinTable()
    articles: Article[];

    @OneToMany(type => Comment, comment => comment.user, { onDelete: 'CASCADE' })
    comments: Comment[];

    @ManyToMany(type => Article, article => article.likeUsers)
    @JoinTable()
    likeArticles: Article[];
}

/**
 * @apiDefine LCCAmountDTO
 * @apiSuccess {number} likeAmount 点赞总数
 * @apiSuccess {number} collectAmount 收藏总数
 * @apiSuccess {number} commentAmount 评论总数
 */
/**
 * @apiDefine UserDTO
 * @apiSuccess {String} id 编号
 * @apiSuccess {String} nickname 用户名
 * @apiSuccess {String} createTime 创建时间
 * @apiSuccess {String} updateTime 更新时间
 * @apiSuccess {String} phone 手机号
 * @apiSuccess {String} realname 真实姓名
 * @apiSuccess {String} email 邮箱
 * @apiSuccess {String} liveCity 居住城市
 * @apiSuccess {String} hometown 家乡
 * @apiSuccess {String} birth 生日
 * @apiSuccess {String} company 公司
 * @apiSuccess {String} univercity 大学
 * @apiSuccess {String} eduacation 教育程度
 */
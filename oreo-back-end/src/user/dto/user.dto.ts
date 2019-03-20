import { Article } from "src/article/article.entity";

export interface User {
    id: number;
    nickname: string;
    createTime: Date;
    updateTime: Date;
    phone: string;
    password: string;
    level: number;
    realname: string;
    email: string;
    liveCity: string;
    hometown: string;
    birth: string;
    company: string;
    univercity: string;
    eduacation: string;
    articles: Article[];
}

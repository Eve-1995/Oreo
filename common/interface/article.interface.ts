import { ClassificationDTO } from "./classification.interface";
import { UserDTO } from "./user.interface";
import { CoreData, LCCNumber } from "./common.interface";
import { CommentDTO } from "./comment.interface";

// 与'文章'关联的实体, 包括'评论'、'收藏的用户'、'点赞的用户'
interface ArticleWithUser extends ArticleDTO {
    'comments': CommentDTO[];
    'users': UserDTO[];
    'likeUsers': UserDTO[];
}

interface SimpleArticle extends CoreData, LCCNumber { }

export interface ArticleDTO {
    'id': number;
    'name': string;
    'createTime': Date;
    'updateTime': Date;
    'content': string;
}

export interface ClassificationWithArticlesAll extends ClassificationDTO {
    'articles': ArticleWithUser[];
}

export interface ClassificationWithArticles {
    'name': string;
    'articles': SimpleArticle[];
}

export interface ArticleBasicInfoAll extends ArticleDTO {
    'users': UserDTO[];
    'likeUsers': UserDTO[];
    'comments': {
        'id': number;
        'createTime': Date;
        'content': string;
    }[];
}

export interface ArticleBasicInfo extends ArticleDTO,LCCNumber { }


import { ArticleDTO } from "./article.interface";
import { UserDTO } from "./user.interface";

interface CommentWithUser {
    'id': number;
    'nickname': string;
    'level': number;
}

interface CommentBase {
    'id': number;
    'content': string;
    'createTime': Date;
    'fromUser': CommentWithUser;
}

interface CommentChild extends CommentBase {
    'toUser': CommentWithUser;
    'fromUserId': number;
    'userLevel': number;
    'rootCommentId': number;
}

export interface CommentDTO {
    'id': number;
    'createTime': Date;
    'content': string;
    'user': UserDTO;
    'article': ArticleDTO;
    'parentComment': Comment;
    'rootComment': Comment;
}

export interface CommentWithArticle extends CommentBase {
    'children': CommentChild[]
}


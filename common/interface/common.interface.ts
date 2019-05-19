// LCC是指like, collect, comment的数值
export interface LCCNumber {
    'likeAmount': number; // 点赞数
    'collectAmount': number; // 收藏数
    'commentAmount': number; // 评论数
}

// 因为id与name传值频率较高, 所以单独抽象出来
export interface CoreData {
    'id': number;
    'name': string;
}


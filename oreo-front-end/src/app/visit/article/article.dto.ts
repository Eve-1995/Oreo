interface Article {
    id: number;
    name: string;
    userAmount: number;
    commentAmount: number;
}
export interface ArticleList {
    name: string;
    articles: Article[];
}

import { ResponseDTO } from '../../others/response.dto';

interface Article {
    id: number;
    name: string;
    userAmount: number;
    commentAmount: number;
}
export interface ArticleList extends ResponseDTO {
    data: {
        name: string;
        articles: Article[];
    };
}

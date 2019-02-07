import { Classification } from '../classification/classification.dto';

export class Article {
  id: number;
  name: string;
  content: string;
  likeAmount: number;
  commentAmount: number;
  classification: Classification;
}

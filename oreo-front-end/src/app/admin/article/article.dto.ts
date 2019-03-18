import { Classification } from '../classification/classification.dto';

export class Article {
  id: number;
  name: string;
  content: string;
  likeAmount: number;
  commentAmount: number;
}

export class ArticleClassificationDto {
  constructor() {
    this.id = undefined;
    this.name = undefined;
    this.content = undefined;
    this.classifications = [];
    this.classificationIds = [];
  }
  id: number;
  name: string;
  content: string;
  classifications: Classification[];
  classificationIds: number[];
}

import { Classification } from '../classification/classification.dto';

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

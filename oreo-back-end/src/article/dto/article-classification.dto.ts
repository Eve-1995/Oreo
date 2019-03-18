import { Classification } from "src/classification/dto/classification.dto";
import { User } from "src/user/user.entity";

export class ArticleClassificationDto {
  name: string;
  content: string;
  classifications: Classification[];
  classificationIds: number[];
  users: User[];
}

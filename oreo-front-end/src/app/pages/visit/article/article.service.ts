import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArticleService {
  constructor(private httpClient: HttpClient) { }
  /**
   * 根据分类id返回该分类信息与其文章信息
   * @param id 分类id
   */
  findArticlesByClassificationId(id: string): any {
    const params = { id };
    return this.httpClient.get(`article/findByClassification`, { params });
  }
  /**
   * 查找第一个分类信息
   */
  findFirstMenu(): any {
    return this.httpClient.get(`classification/findFirst`);
  }
}

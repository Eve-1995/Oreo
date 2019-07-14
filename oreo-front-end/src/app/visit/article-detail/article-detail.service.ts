import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppArticleDetailService {
  constructor(private httpClient: HttpClient) { }
  findBasicInfo(id: string): any {
    const params = { id };
    return this.httpClient.get(`article/findBasicInfo`, { params });
  }
  collect(userId: number, articleId: number): any {
    const dto = { userId, articleId };
    return this.httpClient.post(`user/collect`, dto);
  }
  like(userId: number, articleId: number): any {
    const dto = { userId, articleId };
    return this.httpClient.post(`user/like`, dto);
  }
  actionStatus(id: any, articleId: any): any {
    const params = { id, articleId };
    return this.httpClient.get(`user/actionStatus`, { params });
  }
  getCommentsByArticle(id: any): any {
    const params = { id };
    return this.httpClient.get(`comment/getCommentsByArticle`, { params });
  }
  saveComment(content: string, userId: number, articleId: number, parentCommentId?: number, rootCommentId?: number): any {
    const dto = {
      'content': content,
      'user': {
        id: userId
      },
      'article': {
        id: articleId
      },
      'parentComment': null,
      'rootComment': null
    };
    if (parentCommentId) dto.parentComment = { id: parentCommentId };
    if (rootCommentId) dto.rootComment = { id: rootCommentId };
    return this.httpClient.post(`comment/save`, dto);
  }
}

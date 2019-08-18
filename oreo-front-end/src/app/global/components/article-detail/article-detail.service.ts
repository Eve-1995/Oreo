import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppArticleDetailService {
  constructor(private httpClient: HttpClient) { }
  findBasicInfo(id: string): Observable<any> {
    const params = { id };
    return this.httpClient.get(`article/findBasicInfo`, { params });
  }
  collect(articleId: number): Observable<any> {
    return this.httpClient.post(`user/collect`, { articleId });
  }
  like(articleId: number): Observable<any> {
    return this.httpClient.post(`user/like`, { articleId });
  }
  actionStatus(articleId: any): Observable<any> {
    const params = { articleId };
    return this.httpClient.get(`user/actionStatus`, { params });
  }
  getCommentsByArticle(id: any): Observable<any> {
    const params = { id };
    return this.httpClient.get(`comment/getCommentsByArticle`, { params });
  }
  saveComment(content: string, articleId: number, parentCommentId?: number, rootCommentId?: number): Observable<any> {
    const dto = {
      'content': content,
      'user': {
        id: undefined
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

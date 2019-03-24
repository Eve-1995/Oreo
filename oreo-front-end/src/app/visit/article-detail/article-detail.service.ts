import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDTO } from '../../others/response.dto';

@Injectable()
export class AppArticleDetailService {
  constructor(private httpClient: HttpClient) { }
  findDetailById(id: number): any {
    return this.httpClient.get(`article/findDetailById/${id}`);
  }
  collect(id: number, articleId: number): ResponseDTO | any {
    const dto = { id, articleId };
    return this.httpClient.post(`user/collect`, dto);
  }
  actionStatus(id: any, articleId: any): ResponseDTO | any {
    const params = { id, articleId };
    return this.httpClient.get(`user/actionStatus`, { params });
  }
  getCommentsByArticle(id: any): ResponseDTO | any {
    const params = { id };
    return this.httpClient.get(`comment/getCommentsByArticle`, { params });
  }
  saveComment(content: string, userId: number, articleId: number, parentCommentId?: number, rootCommentId?: number): ResponseDTO | any {
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommentService {
  constructor(private httpClient: HttpClient) { }
}

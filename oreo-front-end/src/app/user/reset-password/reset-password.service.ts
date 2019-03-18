import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResetPasswordService {
  constructor(private httpClient: HttpClient) { }
}

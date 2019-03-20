import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDTO } from '../../others/response.dto';

@Injectable()
export class ResetPasswordService {
  constructor(private httpClient: HttpClient) { }
}

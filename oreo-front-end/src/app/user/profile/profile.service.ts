import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {
  constructor(private httpClient: HttpClient) { }
}

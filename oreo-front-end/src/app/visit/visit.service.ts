import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VisitService {
    constructor(private httpClient: HttpClient) { }

    // 获取类别列表
    getMenu(): any {
        return this.httpClient.get('classification/findClassifications');
    }
}

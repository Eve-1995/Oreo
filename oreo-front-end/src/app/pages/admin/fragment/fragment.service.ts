import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Fragment {
  id: number;
  name: string;
  title: string;
}

@Injectable()
export class FragmentService {
  constructor(private httpClient: HttpClient) { }

  save(obj: Fragment): any {
    return this.httpClient.post(`fragment/save`, obj);
  }

  findTableInfo(name?: string): any {
    if (name) {
      const params = { name };
      return this.httpClient.get(`fragment/findTableInfo`, { params });
    } else {
      return this.httpClient.get(`fragment/findTableInfo`);
    }
  }

  findDetail(id: number): any {
    const body = {
      params: {
        id: id.toString(),
      },
    };
    return this.httpClient.get(`fragment/findDetail`, body);
  }

  delete(id: number): any {
    const body = {
      params: {
        id: id.toString(),
      },
    };
    return this.httpClient.delete(`fragment/delete`, body);
  }
}

import { StorageService } from './storage.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(
    public http: Http,
    public storage: StorageService
  ) { }

  ajax(opt): Observable<any> {
    const obj = opt.body;
    const method: string = opt.method;
    // 将loading状态存入sessionStorage
    this.storage.put({
      type: 'sessionStorage',
      key: 'loadingStatus',
      data: 'loading'
    });
    let url: string = opt.url + '?';
    let body: any = opt.body;
    const creatUrlParams = () => {
      // 拼参数
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          url += key + '=' + obj[key] + '&';
        }
      }
      body = null;
      return url;
    };
    switch (method) {
      case 'get':
        creatUrlParams();
        break;
      case 'delete':
        creatUrlParams();
        break;
      case 'head':
        creatUrlParams();
        break;
      case 'options':
        creatUrlParams();
        break;
      default:
        // 除以上以外的请求需要body部分
        break;
    }
    return this.http[method](url.substring(0, url.length - 1), body)
      .map(res => {
        this.storage.remove('loadingStatus');
        res = res.json();
        if (res.success) {
          // console.log('请求成功'); // 错误的返回根据接口来定
        }
        return res;
      });
  };

}

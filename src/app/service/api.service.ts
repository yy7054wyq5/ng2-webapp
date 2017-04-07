import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class ApiService {

  constructor(
    public http: Http
  ) { }

  ajax(opt): Observable<any> {
    const obj = opt.body;
    const method: string = opt.method;
    let url: string = opt.url + '?';
    let body: any = opt.body || {};
    body.appId = 11;
    body.sign = 'beb790d872f5b20202c7d4e98119c54d';
    const creatUrlParams = () => {
      // 拼参数
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          url += key + '=' + obj[key] + '&';
        }
      }
      body = null;
      url = url.substring(0, url.length - 1);
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
    return this.http[method](url, body)
      .timeout(5000)
      .map(res => {
        // res返回的是整个异步的请求
        res = res.json(); // 通过json()方法将后台的数据输出
        if (res.success) {
          // console.log('请求成功'); // 错误的返回根据接口来定
        }
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  };

}

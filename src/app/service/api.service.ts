import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(
    public http: Http,
    public loader: LoaderService,
  ) { }

  ajax(opt): Observable<any> {
    const loader = this.loader;
    const obj = opt.body;
    const method: string = opt.method;
    let url: string = opt.url + '?';
    let body: any = opt.body;
    const concatUrlParams = () => {
      // 拼参数
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          url += key + '=' + obj[key] + '&';
        }
      }
      body = null;
      return url;
    };
    loader.open();
    switch (method) {
      case 'get':
        concatUrlParams();
        break;
      case 'delete':
        concatUrlParams();
        break;
      case 'head':
        concatUrlParams();
        break;
      case 'options':
        concatUrlParams();
        break;
      default:
        break;
    }
    return this.http[method](url.substring(0, url.length - 1), body)
            .map(res => {
              setTimeout(() => {
                loader.close(); // css中还有过渡的效果
              }, 500);
              return res.json();
            });
  };

}

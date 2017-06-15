import { StorageService } from './storage.service';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import * as Cookies from 'js-cookie';

@Injectable()
export class ResolverService implements Resolve<Object> {

  constructor(
    private api: ApiService,
    private router: Router,
    private storage: StorageService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Object> {
    const userInfo = Cookies.getJSON('userInfo');
    const apiUrl = route.data['api']; // 从路由传入接口地址
    const method = route.data['method']; // 请求方式
    const id = route.params['id'] || '';
    const body = route.data['body'] || {};
    // console.log(route.queryParams);
    // 如果需要url参数请求
    if (route.data['urlParams']) {
      const urlParamsKey = route.data['urlParams'].split(',');
      const urlParamsObj = route.queryParams;
      // console.log(urlParamsObj);
      urlParamsKey.forEach((value: string) => {
        // 遍历对象
        for (const key in urlParamsObj) {
          if (value === key) {
            body[key] = urlParamsObj[key];
          }
        }
      });
    }
    // 参数需要用户id
    if (route.data['ajaxNeedUserId']) {
      body.userId = userInfo.userId;
    }
    return this.api
      .ajax({
        method: method || 'get',
        url: apiUrl + id,
        body: body
      })
      .toPromise()
      .then(res => {
        if (res.success) {
          return res.content;
        } else { // id not found
          this.router.navigate(['']);
          return null;
        }
      });
  }
}

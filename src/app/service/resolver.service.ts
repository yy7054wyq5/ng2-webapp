import { StorageService } from './storage.service';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ResolverService implements Resolve<Object> {

  constructor(
    private api: ApiService,
    private router: Router,
    private storage: StorageService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Object> {
    const apiUrl = route.data['api']; // 从路由传入接口地址
    const id = route.params['id'] || '';
    const body = route.data['body'] || {};
    body.appId = this.storage.get('appinfo')['id'];
    body.sign = 'beb790d872f5b20202c7d4e98119c54d';
    return this.api
      .ajax({
        method: 'get',
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
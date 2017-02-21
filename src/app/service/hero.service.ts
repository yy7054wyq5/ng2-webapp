import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from '../class/hero';

@Injectable()
export class HeroService {

  constructor(private http: Http) { }

  testGet(): Promise<any>{
    return this.http.get('http://scmpurchase.loongjoy.com/api/purchaseParts/getList?fromSys=scmpcapp&lang=zh&pageIndex=1&pageSize=10&token=06dcc3580eaaa25a045b6559f8c0509e')
      .map(response =>{
        return response.json().data;
      })
      .toPromise()
  };
}

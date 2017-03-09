// import { Cookies } from 'js-cookie/src/js.cookie';
import { Injectable } from '@angular/core';

@Injectable()
export class CookiesService {

  constructor(
  ) { }
  get(key: string) {
    // return Cookies.get(key);
  }
  set(key: string, data: any, time: number) {
    // Cookies.set(key, data, {expires: time});
  }
}

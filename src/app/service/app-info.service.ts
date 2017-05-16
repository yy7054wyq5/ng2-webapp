import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  appTag;
  constructor() { }

  tag() {
    if (this.appTag) {
      return this.appTag;
    }
    let url = location.href;
    const httpIndex = url.indexOf('://');
    url = url.substring(httpIndex + 3, url.length);
    const appTagIndex = url.indexOf('/');
    this.appTag = url.substring(appTagIndex + 1, appTagIndex + 7);
    window['appTag'] = this.appTag;
    return this.appTag;
  }

  get(foo?) {
    function reqListener() {
      const res = JSON.parse(this.responseText);
      if (res.success) {
        window['appId'] = res.content.id;
        window['appInfo'] = res.content;
        if (foo) { foo(); }
      } else {
        console.log('获取app信息失败');
      }
    }
    const oReq = new XMLHttpRequest();
    oReq.open('get', '/api/app/info/' + this.tag(), true);
    oReq.send();
    oReq.onload = reqListener;
  }
}

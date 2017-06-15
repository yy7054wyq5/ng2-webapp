import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
declare const WeixinJSBridge: any;

@Injectable()
export class WeixinLoginResolveService {

  constructor() { }

  resolve() {
    if (typeof WeixinJSBridge !== 'undefined' && window['appInfo'].WxAppId) {
      location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + window['appInfo'].WxAppId +
        '&redirect_uri=' + encodeURIComponent(location.href + '/' + window['appTag'] + '/login') +
        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    }
  }
}

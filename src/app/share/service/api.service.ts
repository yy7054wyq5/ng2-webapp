import { DialogService } from './dialog.service';
import { StorageService } from './storage.service';
import { LoadingService } from './loading.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Cookies from 'js-cookie';
import * as crypto from 'crypto-js';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class ApiService {
  constructor(
    public http: Http,
    public loading: LoadingService,
    public storage: StorageService,
    public dialog: DialogService
  ) { }

  _toUnicode(str: string): string {
    let totalCode: string;
    const strArray = str.split('');
    for (let index = 0; index < strArray.length; index++) {
      const code = strArray[index].charCodeAt(0); // 数字编码值
      totalCode += '\\u' + code.toString(16); // 转为16进制数组
    }
    return totalCode;
  }

  _createSign(params: object): string {
    if (params && params['sign']) {
      delete params['sign'];
    }
    const params_array = [];
    const API_SALT = 'ab3e87601534d2ad785eb2d241d59f14';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        // 中文转unicode字符串
        if (typeof params[key] === 'object') {
          const trs = params[key];
          console.log('参数含有数组或者对象');
          params[key] = ''; // 清空该对象的value值
          for (const index in trs) {
            if (trs.hasOwnProperty(index)) {
              const value = trs[index];
              console.log(value);
              let _value;
              // 判断是否含有中文
              if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
                _value = this._toUnicode(value);
              } else {
                _value = value;
              }
              // 判断是否是数字
              if (typeof value === 'number') {
                params[key] += '"' + index + '":' + _value + ',';
              } else {
                params[key] += '"' + index + '":"' + _value + '",';
              }
            }
          }
          params[key] = '{' + params[key].substring(0, params[key].length - 1) + '}';
          params[key] = params[key].replace(/,/g, ';');
        }
        params_array.push(key + '=' + params[key]);
      }
    }
    // 按字母排序后转成字符串
    const str: string = params_array.sort().toString();
    let result = str.replace(/,/g, '&');
    if (result.indexOf('content') > -1) {
      result = result.replace(/;/g, ',');
    }
    return crypto.MD5(result.replace(/\//g, '\\\/') + API_SALT).toString();
  }

  ajax(opt: any): Observable<any> {
    let reqObj = opt.body || {};
    const method: string = opt.method;
    if (!opt.noLoading) {
      this.loading.show();
    }
    let reqUrl: string;
    reqObj.appId = 11;
    // window['appId']
    reqObj.sign = this._createSign(opt.body);
    const _creatUrlParams = (url: string): string => {
      url = url + '?';
      // 拼参数
      for (const key in reqObj) {
        if (reqObj.hasOwnProperty(key)) {
          url += key + '=' + reqObj[key] + '&';
        }
      }
      reqObj = null;
      return url.substring(0, url.length - 1);
    };
    switch (method) {
      case 'get':
        reqUrl = _creatUrlParams(opt.url);
        break;
      case 'delete':
        reqUrl = _creatUrlParams(opt.url);
        break;
      case 'head':
        reqUrl = _creatUrlParams(opt.url);
        break;
      case 'options':
        reqUrl = _creatUrlParams(opt.url);
        break;
      default:
        reqUrl = opt.url;
        // 除以上以外的请求需要body部分
        break;
    }
    return this.http[method](reqUrl, reqObj)
      .timeout(5000)
      .map((res: any) => {
        const userInfo: object = Cookies.getJSON('userInfo');
        // res返回的是整个异步的请求
        if (!opt.noLoading) {
          this.loading.hide();
        }
        if (opt.downNewUserInfo && userInfo) {
          const options: any = {
            appId: window['appId'],
            userId: userInfo['userId'],
            sign: null
          };
          options.sign = this._createSign(options);
          this.http
            .post(_creatUrlParams('/api/account/userinfo'), options)
            .subscribe(backRes => {
              backRes = backRes.json();
              if (backRes['success']) {
                Cookies.set('userInfo', backRes['content']);
                return res.json();
              }
            });
        }
        return res.json(); // 通过json()方法将后台的数据输出
      })
      .catch((err: any) => {
        this.loading.hide();
        this.dialog.open(err);
      });
  };

}

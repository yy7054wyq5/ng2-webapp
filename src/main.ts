import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { appTag } from './ready';

if (environment.production) {
  enableProdMode();
}

const promise = new Promise(function (resolve, reject) {
  const oReq = new XMLHttpRequest();
  oReq.open('get', '/api/app/info/' + appTag, true);
  oReq.send();
  oReq.onload = function () {
    const res = JSON.parse(this['responseText']);
    if (res.success) {
      window['appTag'] = appTag;
      window['appId'] = res.content.id;
      window['appInfo'] = res.content;
      resolve(res);
    } else {
      reject(res);
      console.log('获取app信息失败');
    }
  };
});

promise.then(function (res) {
  if (res['success']) {
    // 将启动应用放入获取app信息的回调，保证apiServiece能够正常工作
    platformBrowserDynamic().bootstrapModule(AppModule);
  }
});


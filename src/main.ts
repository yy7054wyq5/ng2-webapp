import { AppInfoService } from './app/service/app-info.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

const appInfo = new AppInfoService;

if (environment.production) {
  enableProdMode();
}

appInfo.get(function () {
  // 将启动应用放入获取app信息的回调，保证apiServiece能够正常工作
  platformBrowserDynamic().bootstrapModule(AppModule);
});

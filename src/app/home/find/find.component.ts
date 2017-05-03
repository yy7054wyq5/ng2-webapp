import { CacheService } from './../../service/cache.service';
import { StorageService } from './../../service/storage.service';
import { ApiService } from './../../service/api.service';
import { flyIn } from './../../animation/fly-in';
import { Component, OnInit } from '@angular/core';

import 'hammerjs';

@Component({
  selector: 'app-find-component',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.less'],
  animations: [flyIn]
})
export class FindComponent implements OnInit {
  list; // 产品列表
  loadList = []; // 翻页列表
  topCarousel; // 顶部广告
  defaultImage = 'assets/lazy_default.png';
  body = {
    page: 1
  };
  refreshData(action) {
    // 从loader组件返回action
    // console.log(action);
    this.topCarousel = action.locationAds[0].ads;
    this.list = action.hotProducts;
  }
  loadData(action) {
    this.loadList = this.loadList.concat(action);
  }
  constructor(
    private storage: StorageService,
    private cache: CacheService,
    private api: ApiService
  ) { };

  ngOnInit() {
    this.api
      .ajax({
        method: 'get',
        url: '/api/index/index',
        body: this.body
      })
      .subscribe(res => {
        if (res.success) {
          this.topCarousel = res.content.locationAds[0].ads;
          this.list = res.content.hotProducts;
        }
      });
  }
}

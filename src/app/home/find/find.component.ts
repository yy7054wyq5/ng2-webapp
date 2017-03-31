import { StorageService } from './../../service/storage.service';
import { ApiService } from './../../service/api.service';
import { flyIn } from './../../animation/fly-in';
import { Component, OnInit } from '@angular/core';

import 'hammerjs';

@Component({
  selector: 'app-find-component',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.less'],
  providers: [],
  animations: [flyIn]
})
export class FindComponent implements OnInit {
  info; // 商户信息
  list; // 产品列表
  topCarousel; // 顶部广告
  loading;
  downMove = 0;
  defaultImage = 'assets/lazy_default.png';
  constructor(
    private storage: StorageService,
    private api: ApiService
  ) { };

  pandown(action) {
    if (action.deltaY > 0) {
      if (window['scrollY'] === 0) {
        this.loading = true;
        this.downMove = action.deltaY / window['rem'];
      }
    }
  }

  panend(action) {
    if (action.deltaY > 0 && this.loading) {
      this.ajaxData();
    }
  }

  ajaxData() {
    this.loading = true;
    // 获取list
    this.api
      .ajax({
        method: 'get',
        url: '/api/index/index',
        body: {
          appId: this.storage.get('appinfo')['id'],
          page: 1
        }
      })
      .subscribe(home => {
        this.list = home.content.hotProducts;
        this.topCarousel = home.content.locationAds[0].ads;
        this.loading = false;
      });
  }

  ngOnInit() {
    this.ajaxData();
  }

}

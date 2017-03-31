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
  info;
  list;
  topCarousel;
  loading;
  defaultImage = 'assets/lazy_default.png';
  constructor(
    private storage: StorageService,
    private api: ApiService
  ) { };

  pandown() {
    // this.ajaxData();
  }

  ajaxData() {
    this.loading = true;
    // 获取info
    this.api.ajax({
      method: 'get',
      url: '/api/app/info/11',
      body: {
        sign: 'beb790d872f5b20202c7d4e98119c54d'
      }
    })
      .subscribe(res => {
        this.info = res.content;
        this.storage.put({
          type: 'localStorage',
          key: 'appinfo',
          data: res.content
        });
        // 获取list
        this.api.ajax({
          method: 'get',
          url: '/api/index/index',
          body: {
            appId: this.info.id,
            page: 1
          }
        })
          .subscribe(home => {
            this.list = home.content.hotProducts;
            this.topCarousel = home.content.locationAds[0].ads;
            this.loading = false;
          });
      });
  }

  ngOnInit() {
    this.ajaxData();
  }

}

import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  providers: []
})
export class HomeComponent implements OnInit {
  info;
  list;
  defaultImage;
  constructor(
    private storage: StorageService,
    private api: ApiService
  ) { };

  ngOnInit() {
    this.defaultImage = 'assets/lazy_default.png';
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
        .subscribe(resList => {
          this.list = resList.content.hotProducts;
        });
      }
    );
  }

}

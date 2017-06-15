import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from './../../share/service/api.service';
import { flyIn } from './../../share/animation/fly-in';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Data } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
  providers: [ApiService],
  animations: [flyIn]
})
export class ProductDetailComponent implements OnInit {
  detail: any; // 产品详情
  carousel: any; // 轮播图数组
  flag: boolean;
  constructor( // 类的构造函数会在所有其它生命周期钩子之前调用。使用它来注入依赖，但是要避免用它做较重的工作。
    public _activatedRoute: ActivatedRoute,
    public location: Location,
    public api: ApiService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this._activatedRoute.data
      .subscribe(res => {
        this.detail = res['content'];
        this.detail['detail'] = this.sanitizer.bypassSecurityTrustHtml(res['content']['detail']);
        this.carousel = this.detail.albumImages;
      });
    this._activatedRoute.queryParams
      .subscribe(params => {
        // console.log(params);
      });
  }

}

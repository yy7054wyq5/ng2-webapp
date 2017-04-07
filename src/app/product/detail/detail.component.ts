import { ApiService } from './../../service/api.service';
import { flyIn } from './../../animation/fly-in';
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
  detail;
  carousel;
  constructor( // 类的构造函数会在所有其它生命周期钩子之前调用。使用它来注入依赖，但是要避免用它做较重的工作。
    private route: ActivatedRoute,
    private location: Location,
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(res => {
        this.detail = res['content'];
        this.carousel = this.detail.albumImages;
      });
    this.route.queryParams
      .subscribe(params => {
        // console.log(params);
      });
  }

}

import { ApiService } from './../../service/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params , Data } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
  providers: [ApiService],
})
export class DetailComponent implements OnInit {
  title;
  detail;
  constructor( // 类的构造函数会在所有其它生命周期钩子之前调用。使用它来注入依赖，但是要避免用它做较重的工作。
    private route: ActivatedRoute,
    private location: Location,
    private api: ApiService,
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.route.data
      .subscribe(res => {
        this.title = res['title'];
      });
    // this.route.params
    //   .switchMap((params: Params) => {
    //     return this.api.ajax({
    //             method: 'get',
    //             url: '/api/product/detail/' + params['id'],
    //             body: {
    //               sign: 'beb790d872f5b20202c7d4e98119c54d'
    //             }
    //           });
    //   })
    //   .subscribe(res => {
    //     this.detail = res.content;
    //   });
  }

}

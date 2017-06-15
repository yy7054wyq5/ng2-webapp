import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from './../../share/service/api.service';
import { flyIn } from './../../share/animation/fly-in';

// import { SwipemenuComponent } from './../../share/component/swipemenu/swipemenu.component';
// 触摸事件包
// import 'hammerjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ProductListComponent implements OnInit {
  listId: number;
  public products = []; // 产品数据
  public listName = ''; // 产品数据
  body = { // 配合上拉加载组件使用
    page: 1
  };
  constructor(private api: ApiService, private _activatedRoute: ActivatedRoute) {
    // console.log(this._activatedRoute.snapshot.queryParams.name);
    this.listName = this._activatedRoute.snapshot.queryParams['name'];
    this.listId = this._activatedRoute.snapshot.queryParams['id'];
    // 路由产品数据
    this.products = this._activatedRoute.snapshot.data.content.products;
  }

  goCar() {
  }
  ngOnInit() { }
  refreshData(content) {
    console.log(content);
  }

}

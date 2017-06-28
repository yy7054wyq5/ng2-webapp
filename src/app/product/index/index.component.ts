import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from './../../share/service/api.service';
import { flyIn } from './../../share/animation/fly-in';

import * as $ from 'jquery';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  animations: [flyIn]
})
export class ProductIndexComponent implements OnInit {

  productList = []; // 产品分类数据
  products = []; // 产品数据
  indexActive = 0; // 选中导航索引
  productLevel: number; // 导航级数
  widthNum = '0'; // ul.swipemenu宽度
  leftPosi = '0'; // ul.swipemenu定位left值
  currentCount = 0; // 当前移动li索引
  remRate = $(window).width() / 10; // 1rem等于多少px比例
  categoryId: number; // 分类id
  body = { // 配合上拉加载组件使用
    page: 1
  };
  constructor(private api: ApiService, private _activatedRoute: ActivatedRoute) {
    console.log(window['appInfo']);
    // 导航级数
    this.productLevel = window['appInfo'].productLevel;
    // 路由请求分类数据
    this.productList = this._activatedRoute.snapshot.data.content;
    // 默认products数据
    switch (this.productLevel) {
      case 1:
        this.products = this.productList[0].products;
        break;
      case 2:
        this.products = this.productList[0].children;
        break;
      case 3:
        this.products = this.productList[0].children;
        break;
      default:
        break;
    };
    console.log(this.products);
  }

  ngOnInit() { }

  navActive($index, id) {
    this.api
      .ajax({
        method: 'post',
        url: '/api/product/childcategory',
        body: {
          appId: window['appId'],
          categoryId: id
        }
      })
      .subscribe(res => {
        console.log(res.content.products);
        this.products = res.content;
        this.indexActive = $index;
      });
  }

  // 接收子组件的数据
  getChildEvent(content) {
    console.log(content);
    this.products = content.products;
    this.categoryId = content.content;
  }

  // 上拉加载和下来刷新组件返回数据
  refreshData(content) {
    console.log(content);
  }
}

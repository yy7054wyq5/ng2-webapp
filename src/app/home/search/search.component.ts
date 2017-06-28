import { ApiService } from './../../share/service/api.service';
import { flyIn } from './../../share/animation/fly-in';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
  animations: [flyIn]
})
export class SearchComponent implements OnInit {
  list: Array<object>; // 列表
  defaultImage = 'assets/lazy_default.png';
  classic: boolean; // 显示type菜单
  listDisBlock = false; // item展示方式
  lineLeaveLeft: number; // 滚动条
  timeDirection: any; // 时间排序箭头方向
  saleDirection: any; // 销量箭头方向
  priceDirection: any; // 价格箭头方向
  loadBody = { // 用于请求
    orderType: 0, // 排序类型
    order: 'updateTime', // 排序 id:综合 updateTime:时间, saleCount:销量, price:价格
    type: 1, // 产品类型
    keyword: '',
    pageCount: 10,
    page: 1
  };

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  loadData(action: object) {
    this.list = this.list.concat(action);
  }

  refreshData(action: Array<object>) {
    this.list = action;
  }

  changeDirection(direction: number) {
    if (!direction) { // 默认未定义或者null
      direction = 1;
    } else if (direction === 1) {
      direction = 2;
    } else if (direction === 2) {
      direction = 1;
    }
    return direction;
  }

  choseType(num: number) {
    this.classic = !this.classic;
    this.loadBody.type = num;
    this.ajax();
  }

  ajax() {
    this.api
      .ajax({
        method: 'get',
        url: '/api/product/list',
        body: this.loadBody
      })
      .subscribe(res => {
        this.list = res.content.products;
      });
  }

  _genOrderType(direction: number) {
    if (direction === 1 || !direction) {
      this.loadBody.orderType = 1;
    } else {
      this.loadBody.orderType = 0;
    }
  }

  search(num: number) {
    this.lineLeaveLeft = num || this.lineLeaveLeft;
    this.loadBody.page = 1;
    switch (num) {
      case 2:
        this.timeDirection = this.changeDirection(this.timeDirection);
        this.saleDirection = null;
        this.priceDirection = null;
        this._genOrderType(this.timeDirection);
        this.loadBody.order = 'updateTime';
        break;
      case 4:
        this.timeDirection = null;
        this.saleDirection = this.changeDirection(this.saleDirection);
        this.priceDirection = null;
        this._genOrderType(this.saleDirection);
        this.loadBody.order = 'saleCount';
        break;
      case 6:
        this.timeDirection = null;
        this.saleDirection = null;
        this.priceDirection = this.changeDirection(this.priceDirection);
        this._genOrderType(this.priceDirection);
        this.loadBody.order = 'price';
        break;
      default:
        this.loadBody.orderType = 1;
        this.loadBody.order = 'updateTime';
        break;
    }
    this.ajax();
  }

  ngOnInit() {
    this.route.data
      .subscribe(res => {
        this.list = res.content.products;
      });
  }

}

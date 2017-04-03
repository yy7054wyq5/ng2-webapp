import { StorageService } from './../../service/storage.service';
import { ApiService } from './../../service/api.service';
import { flyIn } from './../../animation/fly-in';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  animations: [flyIn]
})
export class ProductIndexComponent implements OnInit {
  list;
  defaultImage = 'assets/lazy_default.png';
  keyword;
  order;
  orderType;
  lineLeaveLeft;
  timeDirection;
  saleDirection;
  priceDirection;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private storage: StorageService
  ) { }

  changeDirection(direction) {
    if (!direction) {
      direction = 1;
    } else if (direction === 1) {
      direction = 2;
    } else if (direction === 2) {
      direction = 1;
    }
    return direction;
  }

  ajax() {
    this.api
      .ajax({
        method: 'get',
        url: '/api/product/list',
        body: {
          orderType: this.orderType || 1,
          order: this.order || 'updateTime',
          type: 1,
          keyword: this.keyword || '',
          appId: this.storage.get('appinfo')['id'],
          pageCount: 10,
          page: 1
        }
      })
      .subscribe(res => {
        this.list = res.content.products;
      });
  }

  search(num: number) {
    this.lineLeaveLeft = num || this.lineLeaveLeft;
    switch (num) {
      case 2:
        this.timeDirection = this.changeDirection(this.timeDirection);
        this.saleDirection = null;
        this.priceDirection = null;
        if (this.timeDirection === 1 || !this.timeDirection) {
          this.orderType = 1;
        } else {
          this.orderType = 0;
        }
        this.order = 'updateTime';
        this.ajax();
        break;
      case 4:
        this.timeDirection = null;
        this.saleDirection = this.changeDirection(this.saleDirection);
        this.priceDirection = null;
        if (this.saleDirection === 1 || !this.saleDirection) {
          this.orderType = 1;
        } else {
          this.orderType = 0;
        }
        this.order = 'saleCount';
        this.ajax();
        break;
      case 6:
        this.timeDirection = null;
        this.saleDirection = null;
        this.priceDirection = this.changeDirection(this.priceDirection);
        if (this.priceDirection === 1 || !this.priceDirection) {
          this.orderType = 1;
        } else {
          this.orderType = 0;
        }
        this.order = 'price';
        this.ajax();
        break;
      default:
        this.ajax();
        break;
    }
  }

  ngOnInit() {
    this.route.data
      .subscribe(res => {
        this.list = res['content'].products;
      });
  }

}

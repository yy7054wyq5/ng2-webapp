import { DialogService } from './../../../share/service/dialog.service';
import { Router } from '@angular/router';
import { ApiService } from './../../../share/service/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.less']
})
export class SizeComponent implements OnInit {
  @Input() detail: any;
  leftPosi = -10;
  count = 1;
  limitnum;
  needcredit;

  constructor(
    private api: ApiService,
    private router: Router,
    private dialog: DialogService
  ) { }

  ngOnInit() {
    console.log(this.detail);
  }
  // 显示规格
  showSize() {
    this.leftPosi = 0;
  }
  // 关闭规格
  closeSize() {
    this.leftPosi = -10;
  }
  // 接收子组件的数据
  getChildEvent(count) {
    console.log(count);
    this.count = count;
  }
  // 加入购物车
  addCar(productId) {
    // console.log(JSON.parse(Cookies.get('userInfo')));
    const userId = JSON.parse(Cookies.get('userInfo')).userId;
    if (userId) {
      this.api.ajax({
        method : 'post',
        url: '/api/cart/set',
        body: {
          userId: userId,
          productId: productId,
          number: this.count,
          tag: 1
        }
      }).subscribe(res => {
        console.log(res);
      });
    }else {
      this.router.navigate([window['appTag'] + '/login']);
    }
  }
  // 立即购买
  buyNow(productId, count) {
    console.log(productId, count);
    if (this.detail['promotionLimitNum'] < count || this.detail['promotionLimitNum'] < count) {
      this.dialog.open('已经购买最大数量，请选择其他产品');
    }
    this.router.navigate([window['appTag'] + '/product/comfirm'], {queryParams: {productId: productId, number: count, tag: 2}});
  }
}

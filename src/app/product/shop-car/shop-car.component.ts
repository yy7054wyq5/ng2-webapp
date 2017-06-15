import { Location } from '@angular/common';
import { ApiService } from './../../share/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-shop-car',
  templateUrl: './shop-car.component.html',
  styleUrls: ['./shop-car.component.less']
})
export class ShopCarComponent implements OnInit {
  cartProducts = []; // 购物车列表信息
  userinfo = Cookies.getJSON('userInfo'); // 用户信息
  totalprice = 0; // 总价
  allCheck: boolean; // 全选
  proTypeToggle: boolean; // 选择产品开关
  type = 1; // 产品类型
  typeName = 'shop_car_product';
  showEdit: boolean; // 编辑的开关
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
    // console.log(this._ActivatedRoute.snapshot.data['content']);
    this.type = this._ActivatedRoute.snapshot.queryParams.type;
  }

  ngOnInit() {
    this.listData(this.type);
  }

  // 购物车名
  _getTypeVal(type) {
    if (type === 1) {
      this.typeName = 'shop_car_product';
    } else {
      this.typeName = 'shop_car_integral_mall';
    }
  }

  // 请求列表数据
  listData(type) {
    this.api.ajax({
      method: 'get',
      url: '/api/cart/list',
      body: {
        userId: this.userinfo.userId,
        type: type
      }
    }).subscribe(res => {
      if (res.success) {
        this.cartProducts = res.content.cartProducts;
      }
    });
  }

  // 合计
  tatal() {
    this.totalprice = 0;
    this.cartProducts.forEach((value, index) => {
      if (value.choseActive) {
        this.totalprice += parseFloat(value.number) * parseFloat(value.price);
      }
    });
    console.log(this.totalprice);

  }
  // 数量加减
  getChildEvent(number, productId, index) {
    // console.log(number,index);
    this.cartProducts[index].number = number;
    this.setCar(productId, number);
  }
  // 设置购物车 更新数量
  setCar(productId, number) {
    this.api.ajax({
      method: 'post',
      url: '/api/cart/set',
      body: {
        userId: this.userinfo.userId,
        productId: productId,
        number: number,
        tag: 2
      }
    }).subscribe(res => {
      if (res.success) {
        this.tatal();
      }
    });
  }
  // 选中li
  productActive(productInfo) {
    let isCheckAll = true;
    productInfo.choseActive = !productInfo.choseActive;
    this.cartProducts.forEach((value, index) => {
      if (!value.choseActive) {
        isCheckAll = false;
      }
    });
    // 判断是否全选
    if (!isCheckAll) {
      this.allCheck = false;
    } else {
      this.allCheck = true;
    }
    this.tatal();
  }
  // 全选
  checkAll() {
    this.allCheck = !this.allCheck;
    this.cartProducts.forEach((value, index) => {
      value.choseActive = this.allCheck;
    });
    this.tatal();
  }
  // 确认订单
  confirm() {
    // 用来判断是否勾选产品
    let sure = false;
    let cartIds = '';
    this.cartProducts.forEach((value, index) => {
      if (value.choseActive) {
        sure = true;
        cartIds = cartIds + value.id + ',';
      }
    });
    console.log(cartIds);
    this.router.navigate([window['appTag'] + '/product/comfirm'], {
      queryParams: {
        cartIds: cartIds,
        tag: 1,
        cartType: this._ActivatedRoute.snapshot.queryParams.type
      }
    });
  };
  // 选择产品类型
  chosePro(num?: number) {
    if (num) {
      this._getTypeVal(num);
      this.type = num;
      this.router.navigate([window['appTag'] + '/product/shop-car'], {
        queryParams: {
          type: num
        }
      });
      this.listData(num);
    }
    this.proTypeToggle = !this.proTypeToggle;
  }

  // 删除订单
  deleteOrder() {
    let cartIds = '';
    this.cartProducts.forEach((value, index) => {
      if (value.choseActive) {
        cartIds += value.id + ',';
      }
    });
    this.api.ajax({
      method: 'delete',
      url: '/api/cart/delete',
      body: {
        userId: this.userinfo.userId,
        cartIds: cartIds
      }
    }).subscribe(res => {
      if (res.success) {
        console.log('删除成功');
        location.reload();
      }
    });
  }
}

import { TranslatePipe } from './../../share/pipe/translate.pipe';
import { DialogService } from './../../share/service/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../share/service/api.service';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';
// 判断是否微信浏览
declare var WeixinJSBridge: any;
@Component({
  selector: 'app-comfirm',
  templateUrl: './comfirm.component.html',
  styleUrls: ['./comfirm.component.less']
})
export class ComfirmComponent implements OnInit {
  // 用户id
  userId = Cookies.getJSON('userInfo').userId;
  userInfo = Cookies.getJSON('userInfo');
  order: any;
  // products: []
  consignee: any; // 收货人地址
  flag: boolean; // 支付方式开关
  wx: boolean; // 微信判断
  paytype = 3; // 支付方式类型，1为支付宝，2为微信，3为货到付款
  payWay = '货到付款'; // 支付方式
  productNumber = 0; // 产品件数
  totalPrice = 0; // 总价
  shippingfee = 0; // 总运费
  remark: string; // 备注
  spendCredits = 0; // 可用积分
  toMoney: number; // 积分可抵扣现金
  tomoneyflag: boolean; // 积分抵扣开关
  sendway: string;
  constructor(
    private api: ApiService,
    private _ActivatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: DialogService,
    private translate: TranslatePipe) {
    this.order = this._ActivatedRoute.snapshot.data.content;
    console.log(this.order);
  }

  ngOnInit() {
    console.log(this.userInfo);
    // 判断是不是微信
    if (typeof (WeixinJSBridge) === 'undefined') {
      this.wx = false;
    } else {
      this.wx = true;
    }
    // alert(this.wx);
    // 计算积分
    if (this.order['products'].length > 0) {
      // 计算可用积分
      this.order['products'].forEach((value, index) => {
        this.spendCredits += parseFloat(value.spendCredits) * parseFloat(value.number);
      });
      // 积分大于用户积分
      if (this.spendCredits > this.userInfo.credits) {
        this.spendCredits = this.userInfo.credits;
      }
      // 积分可抵扣现金
      // console.log(this.spendCredits);
      this.toMoney = this.spendCredits / window['appInfo'].creditRate;
    }

    // 请求地址信息
    // console.log(sessionStorage.getItem('consignee'));
    if (sessionStorage.getItem('consignee')) {
      this.consignee = JSON.parse(sessionStorage.getItem('consignee'));
      this.achievePayMoney(this.consignee.provinceId);
    } else {
      this.api.ajax({
        method: 'get',
        url: '/api/account/address/' + this.userId, // 接口地址
      }).subscribe(res => {
        if (res.success) {
          if (res.content) {
            this.consignee = res.content[0];
            this.achievePayMoney(this.consignee.provinceId);
          }
        }
      });
    }
  }
  // 获取运费
  achievePayMoney(provinceId) {
    this.api.ajax({
      method: 'get',
      url: '/api/public/shippingfee', // 接口地址
      body: {
        provinceId: provinceId
      }
    }).subscribe(res => {
      if (res.success) {
        const shipping_fee = res.content;
        console.log(this.order);
        this.order['products'].forEach((val) => {
          this.productNumber += parseFloat(val.number);
          this.totalPrice += parseFloat(val.number) * parseFloat((val.promotionPrice || val.currentPrice || val.price));
        });
        // console.log(this.productNumber, this.totalPrice)
        this.shippingfee = parseFloat(shipping_fee.price) + parseFloat(shipping_fee.addPrice) * (this.productNumber - 1);
        this.totalPrice = (this.shippingfee) + (this.totalPrice);
        // 当可用积分抵扣金额大于总价时
        if (this.toMoney > this.totalPrice) {
          this.toMoney = this.totalPrice;
          this.spendCredits = this.toMoney * window['appInfo'].creditRate;
        }
      }
    });
  }

  // 现金抵扣
  toCash() {
    this.tomoneyflag = !this.tomoneyflag;
    if (this.tomoneyflag) {
      const cutMoney = this.totalPrice - this.toMoney;
      if (cutMoney < 0) {
        this.totalPrice = this.shippingfee;
        return;
      } else {
        this.totalPrice = this.totalPrice - this.toMoney;
      }
    } else {
      this.totalPrice = this.totalPrice + this.toMoney;
    }
  }
  // 跳转地址列表
  goAddress() {
    // console.log(location.href);
    sessionStorage.setItem('reurl', location.href);
    this.router.navigate([window['appTag'] + '/mine/address/' + this.userId], { queryParams: { tag: 1 } });
  }
  // 支付方式的遮罩成开关
  set() {
    this.flag = !this.flag;
  }
  // 支付方式的选择
  pay(num) {
    this.paytype = num;
    switch (num) {
      case 1:
        this.payWay = '支付宝支付';
        break;
      case 2:
        this.payWay = '微信支付';
        break;
      case 3:
        this.payWay = '货到付款';
        break;
    }
  }

  // 定义支付回调函数
  onBridgeReady(appId, timeStamp, nonceStr, packages, paySign) {
    WeixinJSBridge.invoke('getBrandWCPayRequest', {
      'appId': appId, // 公众号名称，由商户传入
      'timeStamp': timeStamp, // 时间戳，自1970年以来的秒数
      'nonceStr': nonceStr, // 随机串
      'package': packages,
      'signType': 'MD5', // 微信签名方式：
      'paySign': paySign // 微信签名
    },
      function (resData) {
        // 提示
        this.dialog.open(resData);
        this.api.ajax({
          method: 'post',
          url: '/api/public/error',
          body: {
            appId: window['appId'],
            message: resData
          }
        });
        if (resData.err_msg === 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          this.router.navigate([window['appTag'] + '/product/order']);
        }
      });
  };

  // 提交订单
  sendOrder() {
    if (!this.consignee) {
      // 提示选择收货地址
      this.dialog.open(this.translate.transform('please_select_the_receiving_address'));
    } else if (this.paytype === undefined) {
      // 提示选择支付方式
      this.dialog.open(this.translate.transform('please_select_the_pay_type'));
    } else {
      const creattime = Date.parse(new Date() + '');
      //  alert(this.userInfo.openId);
      //  alert(JSON.stringify(this.userInfo));
      this.api.ajax({
        method: 'post',
        url: '/api/order/create',
        body: {
          creattime: creattime,
          userId: this.userId,
          tag: this._ActivatedRoute.snapshot.queryParams.tag,
          payType: this.paytype,
          shippingAddress: this.consignee.id,
          productId: this._ActivatedRoute.snapshot.queryParams.productId,
          number: this._ActivatedRoute.snapshot.queryParams.number,
          cartIds: this._ActivatedRoute.snapshot.queryParams.cartIds,
          cartType: this._ActivatedRoute.snapshot.queryParams.cartType,
          fromType: 2,
          spendCredit: 0,
          remark: this.remark,
          openId: this.userInfo.openId || ''
        }
      }).subscribe(res => {
        // alert(JSON.stringify(this.userInfo));
        // alert(JSON.stringify(res));

        // 请求成功
        if (res.success) {
          // alert(JSON.stringify(res));
          // 判断是选择的微信支付
          if (this.paytype === 2) {
            // 悦单支付
            if (typeof (WeixinJSBridge) === 'undefined') {
              // 判断该商铺绑定了悦单支付
              // alert(111111);
              if (res.content.data.billQRCodePath) {
                this.router.navigate([window['appTag'] + '/product/qr-code'], {
                  queryParams: {
                    src: res.content.data.billQRCodePath,
                    id: res.content.orderId
                  }
                });
                return;
              }
              // 调微信支付
              // if (document.addEventListener) {
              // 	document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              // } else if (document.attachEvent) {
              // 	document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              // 	document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              // }
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function () {
                  return this.onBridgeReady();
                }, false);
              } else {
                (<any>document).attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                (<any>document).attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
              }
            } else if (window['WxAppId'] && WeixinJSBridge) {
              // 微信环境有悦单无微信支付
              const yuedanPayUrl = res.content.data.billQRCode;
              location.href = yuedanPayUrl;
              return;
            } else {
              const appId = res.content.data.appId;
              const timeStamp = res.content.data.timeStamp;
              const nonceStr = res.content.data.nonceStr;
              const packages = res.content.data.package;
              const paySign = res.content.data.paySign;
              this.onBridgeReady(appId, timeStamp, nonceStr, packages, paySign);
            }
          } else {
            console.log(window['appTag'] + '/product/order-detail');
            this.router.navigate(['/' + window['appTag'] + '/product/order-detail', res.content.orderId], {
              queryParams: { id: res.content.orderId }
            });
          }
        };
        console.log(res);
      });
    }
  }

}

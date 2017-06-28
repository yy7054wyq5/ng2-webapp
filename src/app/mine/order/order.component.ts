import { ApiService } from './../../share/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// 判断是否微信浏览
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {
  myOrder = []; // 订单列表
  allOrder = [];
  // 导航数据
  orderMenuData = [
    { name: '全部', id: '-1' },
    { name: '未支付', id: '0' },
    { name: '已支付', id: '1' },
    { name: '支付失败', id: '2' },
    { name: '已发货', id: '3' },
    { name: '货到付款', id: '4' },
    { name: '已取消', id: '5' },
    { name: '已完成', id: '6' }
  ];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
    this.allOrder = this._activatedRoute.snapshot.data.content.orders;
    this.myOrder = this._activatedRoute.snapshot.data.content.orders;
    console.log(this.myOrder);
  }

  ngOnInit() {
  }

  getChildEvent(id: string) {
    console.log(id);
    this.choseMenu(id);
  }

  // 点击导航切换选项
  choseMenu(payState: string) {
    this.myOrder = [];
    // console.log(this.allOrder);
    if (parseInt(payState, 10) === -1) {
      this.myOrder = this.allOrder;
    } else {
      this.allOrder.forEach((value, index) => {
        if (parseInt(value.payState, 10) === parseInt(payState, 10)) {
          this.myOrder.push(value);
        }
      });
    }
    // console.log(this.myOrder);
  }
	// 确认收货、删除订单、取消订单操作
  takeGoods(orderId: number, url: string, toState: number) {
    this.api.ajax({
      method: 'post',
      url: url,
      ajaxNeedUserId: true,
      body: {
        orderId: orderId,
        toState: toState
      }
    }).subscribe(res => {
      if (res.success) {
        location.reload();
      }
    });
  }

  // 定义支付回调函数
  _onBridgeReady(appId: number, timeStamp: number, nonceStr: string, packages: any, paySign: string) {
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
          this.router.navigate(['/product/order']);
        }
      });
  };
  // 去支付支付、重新支付
  goConfirm(orderId: number, payType: number) {
    this.api.ajax({
      method: 'post',
      url: '/api/order/pay',
      body: {
        orderId: orderId,
        payType: payType,
        fromType: 2
      }
    }).subscribe(res => {
      // 请求成功
      if (res.success) {
        if (payType === 2) {
          // 悦单支付
          if (typeof (WeixinJSBridge) === 'undefined') {
            // 判断该商铺绑定了悦单支付
            // alert(111111);
            if (res.content.data.billQRCodePath) {
              this.router.navigate(['/product/qr-code'], {
                queryParams: {
                  src: res.content.data.billQRCodePath,
                  id: res.content.orderId
                }
              });
              return;
            }
            // 调微信支付
            // if (document.addEventListener) {
            // 	document.addEventListener('WeixinJSBridgeReady', _onBridgeReady, false);
            // } else if (document.attachEvent) {
            // 	document.attachEvent('WeixinJSBridgeReady', _onBridgeReady);
            // 	document.attachEvent('onWeixinJSBridgeReady', _onBridgeReady);
            // }
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', function(){
                return this._onBridgeReady();
              }, false);
            }else {
                (<any>document).attachEvent('WeixinJSBridgeReady', this._onBridgeReady);
                (<any>document).attachEvent('onWeixinJSBridgeReady', this._onBridgeReady);
            }
          }else if (window['WxAppId'] && WeixinJSBridge) {
            // 微信环境有悦单无微信支付
            this.router.navigate(['/product/qr-code'], {
              queryParams: {
                src: res.content.data.billQRCodePath,
                id: res.content.orderId
              }
            });
          }else {
            // 微信支付
            const appId: number = res.content.data.appId;
            const timeStamp: number = res.content.data.timeStamp;
            const nonceStr: string = res.content.data.nonceStr;
            const packages: any = res.content.data.package;
            const paySign: string = res.content.data.paySign;
            this._onBridgeReady(appId, timeStamp, nonceStr, packages, paySign);
          }
        }else {
          // console.log('/product/order-detail');
          this.router.navigate(['/' + '/product/order-detail', res.content.orderId],
          { queryParams: { id: res.content.orderId }
          });
        }
      }
    });

  }
}

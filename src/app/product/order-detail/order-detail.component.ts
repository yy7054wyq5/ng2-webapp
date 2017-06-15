import { ApiService } from './../../share/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// 判断是否微信浏览
declare var WeixinJSBridge: any;

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.less']
})
export class OrderDetailComponent implements OnInit {
  order: any;
  appTag = window['appTag'];
  orderComfirm: boolean;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
    this.order = this._ActivatedRoute.snapshot.data.content;
    console.log(this.order);
  }

  ngOnInit() {
  }
	// 确认收货、删除订单、取消订单操作
  takeGoods(orderId, url, toState) {
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
        if (resData.err_msg == 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          this.router.navigate([window['appTag'] + '/product/order']);
        }
      });
  };
  // 重新支付
  repay(orderId, payType) {
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
      if (res.success){
        if (payType === 2) {
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
              document.addEventListener('WeixinJSBridgeReady', function(){
                return this.onBridgeReady();
              }, false);
            }else {
                (<any>document).attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                (<any>document).attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            }
          }else if (window['WxAppId'] && WeixinJSBridge) {
            // 微信环境有悦单无微信支付
            this.router.navigate([window['appTag'] + '/product/qr-code'], {
              queryParams: {
                src: res.content.data.billQRCodePath,
                id: res.content.orderId
              }
            });
          }else {
            // 微信支付
            const appId = res.content.data.appId;
            const timeStamp = res.content.data.timeStamp;
            const nonceStr = res.content.data.nonceStr;
            const packages = res.content.data.package;
            const paySign = res.content.data.paySign;
            this.onBridgeReady(appId, timeStamp, nonceStr, packages, paySign);
          }
        }else {
          console.log(window['appTag'] + '/product/order-detail');
          this.router.navigate(['/' + window['appTag'] + '/product/order-detail', res.content.orderId],{ queryParams: { id: res.content.orderId } 
          });
        }
      }
    })

  }
}

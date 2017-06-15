import { TranslatePipe } from './../../share/pipe/translate.pipe';
import { ApiService } from './../../share/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.less']
})
export class SaleComponent implements OnInit, OnDestroy {
  swipeList: Array<object>; // 横向滚动条
  products: Array<object>; // 产品列表
  countDownObj: object; // 促销倒计时
  countDownTime: string;
  saleBg: string;
  _countDownIntervalId: any;
  _initUrl = '/api/product/promotionproduct/';
  url: string;
  body = {
    page: 1
  };

  constructor(
    public api: ApiService,
    public translate: TranslatePipe
  ) { }

  getChildEvent(action: object) {
    this.products = action['products'];
    this.url = this._initUrl + action['categoryId'];
    clearInterval(this._countDownIntervalId);
    for (let index = 0; index < this.swipeList.length; index++) {
      if (this.swipeList[index]['id'] === action['categoryId']) {
        this._genCountDownTime(this.swipeList[index]);
      }
    }
  }

  refreshData(action: object) {
    this.products = action['products'];
  }

  loadData(action: object) {
    this.products = this.products.concat(action['products']);
  }

  _addZeroPrefix(num: number) {
    if (num < 10) {
      return '0' + parseInt(num.toString(), 10);
    }
    return parseInt(num.toString(), 10);
  }

  _toInit(num: any) {
    let firstNum;
    if (typeof num === 'string') {
      firstNum = num.substring(0, 1);
      if (firstNum === '0') {
        return parseInt(num.substring(1, num.length), 10);
      }
    }
    return parseInt(num, 10);
  }

  _genCountDownTime(countDownObj: object) {
    const _genDHMS = (days: string, hours: string, minutes: string, seconds: string) => {
      this.countDownTime = days + ' ' +
        this.translate.transform('day') + ' ' +
        hours + ':' +
        minutes + ':' +
        seconds;
    }
    // status: "1", //当前状态 1未开抢  2已开抢  3已抢光
    if (countDownObj['status'] === 3) {
      return;
    }
    let days: any = (countDownObj['promotionTimeLeft'] / (3600 * 24)).toString();
    let hours: any = (days.substring(days.indexOf('.'), days.length) * 24).toString();
    let minutes: any = (hours.substring(hours.indexOf('.'), hours.length) * 60).toString();
    let seconds: any = minutes.substring(minutes.indexOf('.'), minutes.length) * 60;
    days = this._addZeroPrefix(days);
    hours = this._addZeroPrefix(hours);
    minutes = this._addZeroPrefix(minutes);
    seconds = this._addZeroPrefix(seconds);
    _genDHMS(days, hours, minutes, seconds);
    this._countDownIntervalId = setInterval(() => {
      seconds -= 1;
      seconds = this._addZeroPrefix(seconds);
      if (this._toInit(seconds) === -1) {
        seconds = 59;
        minutes -= 1;
        minutes = this._addZeroPrefix(minutes);
        if (this._toInit(minutes) === -1) {
          minutes = 59;
          hours -= 1;
          hours = this._addZeroPrefix(hours);
          if (this._toInit(hours) === -1) {
            hours = 24;
            days -= 1;
            days = this._addZeroPrefix(days);
            if (days === -1) {
              clearInterval(this._countDownIntervalId);
            }
          }
        }
      }
      _genDHMS(days, hours, minutes, seconds);
    }, 1000);
  }

  ngOnInit() {
    this.api
      .ajax({
        method: 'post',
        url: '/api/product/promotion/' + window['appId'],
        body: {
          page: 1
        }
      })
      .subscribe(res => {
        if (res.success && res.content) {
          this.swipeList = res.content;
          this.countDownObj = this.swipeList[0];
          this.url = this._initUrl + this.swipeList[0]['id']; // 默认分类
          this.products = this.swipeList[0]['products'];
          this._genCountDownTime(this.countDownObj);
        } else {
          if (!this.products || (this.products && this.products.length === 0)) {
            this.saleBg = '#fff';
          }
        }
      });
  }

  ngOnDestroy() {
    clearInterval(this._countDownIntervalId);
  }
}

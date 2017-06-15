import { TranslatePipe } from './../../share/pipe/translate.pipe';
import { ApiService } from './../../share/service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  minHeight: number;
  userInfo: any = Cookies.getJSON('userInfo');
  appTag: string = window['appTag'];
  app: any = window['appInfo'];
  records = [];

  roleUpdateTime = Date.now();
  timeStart: any;
  timeEnd: any;
  sum: number;
  tag = 1;
  /*
  * 加载刷新所需参数
  */
  url: string;
  body: object;
  dataKey: string;
  method = 'get';
  constructor(
    public router: Router,
    public api: ApiService,
    public activeRoute: ActivatedRoute,
    public translate: TranslatePipe
  ) { }

  /*
  * 登出，清除用户cookie
  */
  out() {
    if (confirm(this.translate.transform('sure_to_out'))) {
      Cookies.remove('userInfo');
      this.router.navigate(['/' + this.appTag + '/index/find']);
    }
  }

  /*
  * 清除筛选条件
  */
  clearTime() {
    this.timeEnd = '';
    this.timeStart = '';
    this.tag = 1;
    this.router.navigate(['/' + this.appTag + '/mine']);
    this.body = {
      page: 1,
      pageCount: 10,
      payState: -1,
      type: 2,
      tag: this.tag,
      userId: this.userInfo['userId']
    }
    this._getRecords(this.body);
  }

  toCalendar() {
    this.activeRoute.queryParams
      .subscribe(res => {
        if (Object.keys(res).length === 0) {
          this.router.navigate(['/' + this.appTag + '/mine/calendar']);
        } else {
          this.router.navigate(['/' + this.appTag + '/mine/calendar'], {
            queryParams: res
          });
        }
      });
  }

  _creatAjaxBody(): object {
    let payState;
    let back;
    this.activeRoute.queryParams
      .subscribe(res => {
        back = res;
        payState = res.payState || -1;
        if (Object.keys(res).length > 0) {
          this.timeStart = res.timeStart;
          this.timeEnd = res.timeEnd;
          this.tag = parseInt(res.tag, 10);
        }
      });
    return Object.assign({
      page: 1,
      pageCount: 10,
      userId: this.userInfo['userId'],
      payState: payState,
      type: 2,
      tag: this.tag
    }, back);
  }

  _getRecords(body?: object) {
    if (!body) {
      this.body = this._creatAjaxBody();
    }
    this.api
      .ajax({
        method: this.method,
        url: this.url,
        body: body || this.body
      })
      .subscribe(back => {
        if (back.success) {
          this.records = back.content.records || back.content.orders;
          this.sum = back.content.sum;
        }
      });
  }

  loadData(action: Array<object>) {
    this.records = this.records.concat(action);
  }

  refreshData(action: Array<object>) {
    this.records = action;
  }

  ngOnInit() {
    this.minHeight = window.innerHeight;
    this.body = this._creatAjaxBody();
    const roleTag = this.userInfo['roleTag'];
    console.log(this.userInfo);
    if (roleTag === 'BranchAdmin') {
      this.url = '/api/order/list';
      this.dataKey = 'orders';
    } else if (roleTag === 'AppUser') {
      return;
    } else {
      this.url = '/api/account/deduct';
      this.dataKey = 'records';
      this.method = 'post';
    }
    this._getRecords();
  }

}

import { ApiService } from './../../share/service/api.service';
import { IsLoginGuard } from './../../share/guard/is-login.guard';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-point-mall',
  templateUrl: './point-mall.component.html',
  styleUrls: ['./point-mall.component.less']
})
export class PointMallComponent implements OnInit {
  list: Array<object>;
  body = {
    page: 1,
    pageCount: 10
  };
  userInfo: object;
  canConvert: boolean;
  userPoints: number;
  noDataTxt = 'no_data';
  constructor(
    public activatedRoute: ActivatedRoute,
    public isLogin: IsLoginGuard,
    public api: ApiService
  ) { }

  refreshData(action: Array<object>) {
    this.list = action;
  }

  loadData(action: object) {
    this.list = this.list.concat(action);
  }

  convertibleProducts() {
    if (this.isLogin.isLogin()) {
      this.canConvert = !this.canConvert;
      if (!this.canConvert) {
        this.body['userId'] = '';
      } else {
        this.body['userId'] = this.userInfo['userId'];
      }
      this.api
        .ajax({
          method: 'post',
          url: '/api/product/credit',
          body: this.body
        })
        .subscribe(res => {
          if (res.success) {
            this.list = res.content.creditProducts;
            if (this.list.length === 0 && this.body['userId']) {
              this.noDataTxt = 'integral_not_enough';
            } else if (this.list.length === 0 && !this.body['userId']) {
              this.noDataTxt = 'no_data';
            }
          }
        });
    }
  }

  ngOnInit() {
    this.userInfo = Cookies.getJSON('userInfo');
    if (this.userInfo) {
      if (this.canConvert) {
        this.body['userId'] = this.userInfo['userId'];
      }
      this.userPoints = this.userInfo['credits'];
    }
    this.activatedRoute.data
      .subscribe(res => {
        this.list = res.content.creditProducts;
      });
  }

}

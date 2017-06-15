import { ApiService } from './../../share/service/api.service';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';


@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.less']
})
export class PointComponent implements OnInit {
  userInfo: any = Cookies.getJSON('userInfo');
  pointRecords: Array<object>;
  constructor(
    public api: ApiService
  ) { }

  ngOnInit() {
    this.api
      .ajax({
        method: 'post',
        url: '/api/account/creditrecord',
        body: {
          type: 0,
          userId: this.userInfo['userId'],
          page: 1
        }
      })
      .subscribe(res => {
        if (res.success) {
          this.pointRecords = res.content.records;
        }
      });
  }

}

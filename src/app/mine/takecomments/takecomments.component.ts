import { ApiService } from './../../share/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';
@Component({
  selector: 'app-takecomments',
  templateUrl: './takecomments.component.html',
  styleUrls: ['./takecomments.component.less']
})
export class TakecommentsComponent implements OnInit {
  list: Array<object>;
  userId: number = Cookies.getJSON('userInfo').userId;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.list = this._ActivatedRoute.snapshot.data.content.details;
  }
  // 立即评价
  commit() {
    const data = [];
    this.list.forEach((value, index) => {
      data.push({
        productId: value['productId'],
        score:  value['score'],
        content: value['content']
      });
    });
    console.log(data);
    console.log(console.log());
    this.api.ajax({
      method: 'post',
      url: '/api/order/comment',
      body: {
        userId: this.userId,
        orderId: this.list[0]['orderId'],
        data: JSON.stringify(data)
      }
    }).subscribe(res => {
      if (res.success) {
        this.router.navigate(['/mine/order']);
      }
    });
  }
  // 接受子组件数据
  getChildEvent($event: number, index: number) {
    console.log($event, index);
    this.list[index]['score'] = $event;
  }
}

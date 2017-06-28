import { ApiService } from './../../share/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.less']
})
export class AddressComponent implements OnInit {
  address: Array<object>; // 地址列表信息
  userInfo: object = Cookies.getJSON('userInfo');
  tag: number; // 1:选择改地址;2:编辑地址
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {
    this.address = this._ActivatedRoute.snapshot.data.content;
    this.tag = this._ActivatedRoute.snapshot.queryParams.tag;
    console.log(this.address);
  }

  ngOnInit() {
  }

  // 在地址页面对地址的操作
  handleAddress(index: number, id: number) {
    // tag==1,选择该地址
    // 返回订单页
    if (this.tag == 1) {
      // console.log(typeof(JSON.stringify(this.address[index])));
      sessionStorage.setItem('consignee', JSON.stringify(this.address[index]));
      location.href = sessionStorage.reurl;
    } else {
      // 修改地址
      sessionStorage.setItem('editAddress', JSON.stringify(this.address[index]));
      this.router.navigate(['/mine/plus-address'], { queryParams: { tag: 1 } });
    }
  }
  // 左滑
  scrollleft(obj) {
    // console.log(obj)
    obj.deleteShow = 1;
  }
  // 右滑
  scrollright(obj) {
    // console.log(obj)
    obj.deleteShow = 0;
  }
  // 删除
  deleteAdd(id: number, index: number) {
    const consignee: object = JSON.parse(sessionStorage.getItem('consignee'));
    console.log(this.userInfo);
    this.api.ajax({
      method: 'get',
      url: '/api/account/deleteaddress',
      body: {
        userId: this.userInfo['userId'],
        addressId: id
      }
    }).subscribe(res => {
      if (res.success) {
        console.log(consignee);
        if (consignee && consignee['id'] == id) {
          sessionStorage.removeItem('consignee');
        }
        this.address.splice(index, 1);
        // location.reload();
      }
    });
  }
}

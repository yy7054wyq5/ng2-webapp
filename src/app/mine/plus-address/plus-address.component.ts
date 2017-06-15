import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from './../../share/service/dialog.service';
import { ApiService } from './../../share/service/api.service';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';
@Component({
  selector: 'app-plus-address',
  templateUrl: './plus-address.component.html',
  styleUrls: ['./plus-address.component.less']
})
export class PlusAddressComponent implements OnInit {
  // 表单那数据初始化
  addressInfo = {
    consignee: '',
    mobile: '',
    detail: '',
    postcode: ''
  };
  // 用户id
  userId: number = Cookies.getJSON('userInfo').userId;
  // 省份数据
  prodata: any;
  // 城市id
  provinceId: number;
  cityId: number;
  areaId: number;
  constructor(
    private api: ApiService,
    private dialog: DialogService,
    private _ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    // tag===1，为修改地址
    const tag: number = this._ActivatedRoute.snapshot.queryParams.tag;
    if (sessionStorage.getItem('editAddress') && tag === 1) {
      console.log(JSON.parse(sessionStorage.getItem('editAddress')));
      this.addressInfo = JSON.parse(sessionStorage.getItem('editAddress'));
    }
    // 省会数据
    this.api.ajax({
      method: 'post',
      url: 'api/public/provincecityareaitems',
      body: {
        parentId: 0
      }
    }).subscribe(res => {
      console.log(res);
      this.prodata = res.content;
    });
  }
  // 接受自组建数据
  getChildEvent(ops: object) {
    this.provinceId = ops['proId'];
    this.cityId = ops['cityId'];
    this.areaId = ops['areaId'];
  }

  // 新增
  saveAdd() {
    console.log(this.addressInfo);
    if (this.addressInfo.mobile.toString().length !== 11) {
      this.dialog.open('请输入11位手机号码');
    }else {
      this.api.ajax({
        method: 'post',
        url: 'api/account/addaddress',
        body: {
          userId: this.userId,
          consignee: this.addressInfo.consignee,
          provinceId: this.provinceId || this.addressInfo['provinceId'],
          cityId: this.cityId || this.addressInfo['cityId'],
          areaId: this.areaId || this.addressInfo['areaId'],
          detail: this.addressInfo.detail,
          mobile: this.addressInfo.mobile,
          postcode: this.addressInfo.postcode,
          addressId: this.addressInfo['id']
        }
      }).subscribe(res => {
        if (res.success) {
          // console.log(window['appTag'] + '/mine/address')
          this.router.navigate([window['appTag'] + '/mine/address/' + this.userId]);
        }
      });
    }

  }
}

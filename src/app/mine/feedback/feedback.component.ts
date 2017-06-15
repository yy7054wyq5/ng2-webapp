import { TranslatePipe } from './../../share/pipe/translate.pipe';
import { ApiService } from './../../share/service/api.service';
import { DialogService } from './../../share/service/dialog.service';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.less']
})
export class FeedbackComponent implements OnInit {

  /**
   * 列表数据
   */
  msg = [];

  userId = 0;

  /**
   * 用户头像
   */
  imagePath: string;

  /**
   * 发表意见的内容
   */
  content = '';

  constructor(private api: ApiService,
    private toast: DialogService) {
    if (Cookies.get('userInfo') !== undefined) {
      this.userId = JSON.parse(Cookies.get('userInfo')).userId;
      this.imagePath = JSON.parse(Cookies.get('userInfo')).imagePath;
    }
    this.getLastAsvise();
  }

  ngOnInit() {
  }

  /**
   * 获取最新的意见反馈
   */
  getLastAsvise() {
    this.api.ajax({
      method: 'post',
      url: '/api/account/advise',
      body: {
        userId: this.userId
      }
    }).subscribe(res => {
      if (res.success === 1) {
        if (res.content !== undefined) {
          this.msg = res.content;
        }
      }
    });
  }

  /**
   * 发表意见反馈
   */
  createAdvice() {
    this.api.ajax({
      method: 'get',
      url: '/api/account/createadvice',
      body: {
        userId: this.userId,
        content: this.content
      }
    }).subscribe(res => {
      if (res.success === 1) {
        this.toast.open(res.msg, 3000);
        this.content = '';
        this.getLastAsvise();
      }
    });
  }

  suggest() {
    if (this.content === undefined || this.content === '') {
      this.toast.open(new TranslatePipe().transform('please_input_what_you_feedback'), 3000);
      return;
    }
    this.createAdvice();
  }

}

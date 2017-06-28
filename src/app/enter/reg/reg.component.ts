import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../share/service/api.service';
import { DialogService } from './../../share/service/dialog.service';
import { TranslatePipe } from './../../share/pipe/translate.pipe';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.less'],
  providers: []
})
export class RegComponent implements OnInit, OnDestroy {
  regForm: any = {
    mobile: null,
    nickname: null,
    password: null,
    captcha: null
  };
  passWordInputType = 'password';
  title: string; // 页面标题
  btnTxt: string; // 按钮文字
  tag: number; // 区分页面
  getcaptchaTxt: string = this.translate.transform('get_code'); // 获取验证码文字
  captchaCountDownTime: any; // 验证码倒计时
  intervalCaptchaCountDownId: any;

  constructor(
    public translate: TranslatePipe,
    public disloag: DialogService,
    public api: ApiService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  reg() {
    this.api
      .ajax({
        method: 'post',
        url: '/api/account/register',
        body: this.regForm
      })
      .subscribe(res => {
        this.disloag.open(res.msg);
        if (res.success) {
          this.router.navigate(['/login']);
        }
      });
  }

  updatePassWord() {
    this.api
      .ajax({
        method: 'post',
        url: '/api/account/backpwd',
        body: this.regForm
      })
      .subscribe(res => {
        this.disloag.open(res.msg);
        if (res.success) {
          this.router.navigate(['/login']);
        }
      });
  }

  checkMobile() {
    if (this.regForm['mobile']) {
      this.api
        .ajax({
          method: 'post',
          url: '/api/account/unregisteredmobile',
          body: {
            mobile: this.regForm['mobile']
          }
        })
        .subscribe(res => {
          if (res.success === 0) { // 手机号已注册
            if (this.tag > -1) { // 注册
              this.disloag.open(res.msg);
              this.regForm['mobile'] = null;
            }
          } else { // 手机号未注册
            if (this.tag === -1) { // 找回密码
              this.disloag.open(this.translate.transform('invalid_mobile'));
              this.regForm['mobile'] = null;
            }
          }
        });
    }
  }

  _countDown() {
    this.captchaCountDownTime = Cookies.get('captchaCountDownTime') || 60;
    this.intervalCaptchaCountDownId = setInterval(() => {
      this.captchaCountDownTime -= 1;
      if (this.captchaCountDownTime === 0) {
        Cookies.remove('captchaCountDownTime');
        this.getcaptchaTxt = this.translate.transform('re_acquisition');
        clearInterval(this.intervalCaptchaCountDownId);
        return;
      }
      Cookies.set('captchaCountDownTime', this.captchaCountDownTime);
      this.getcaptchaTxt = '(' + this.captchaCountDownTime + 'S)';
    }, 1000);
  }

  getCaptcha() {
    if (!this.regForm.mobile || this.regForm.mobile.length !== 11) {
      this.disloag.open(this.translate.transform('please_input_real_mobile'));
      return;
    }
    if (this.tag > -1) { // 注册页验证
      if (!this.regForm.nickname || this.regForm.nickname.length < 2 || this.regForm.nickname.length > 12) {
        this.disloag.open(this.translate.transform('nickname_must_between'));
        return;
      }
    }
    if (!this.regForm.password || this.regForm.password.length < 6 || this.regForm.password.length > 12) {
      this.disloag.open(this.translate.transform('password_must_between'));
      return;
    }
    if (this.captchaCountDownTime > 0) {
      return;
    }
    this.api
      .ajax({
        method: 'post',
        url: '/api/account/captcha',
        body: {
          mobile: this.regForm.mobile,
          tag: this.tag > -1 ? 1 : 2
        }
      })
      .subscribe(res => {
        this.disloag.open(res.msg);
        this._countDown();
      });
  }

  ngOnInit() {
    this.title = this.translate.transform(this.activatedRoute.snapshot.data['title']);
    this.btnTxt = this.translate.transform(this.activatedRoute.snapshot.data['btnTxt']);
    this.tag = this.router.url.indexOf('reg'); // 大于-1是注册页，等于-1是找回密码页
    if (Cookies.get('captchaCountDownTime')) {
      this._countDown();
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalCaptchaCountDownId);
  }
}

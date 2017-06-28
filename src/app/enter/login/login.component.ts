import { IsLoginGuard } from './../../share/guard/is-login.guard';
import { DialogService } from './../../share/service/dialog.service';
import { Router } from '@angular/router';
import { ApiService } from './../../share/service/api.service';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm: any = {
    mobile: null,
    password: null
  };

  constructor(
    public api: ApiService,
    public router: Router,
    public dialog: DialogService,
    public location: Location,
    public isLogin: IsLoginGuard
  ) { }

  login() {
    this.api
      .ajax({
        method: 'post',
        url: '/api/account/login',
        body: this.loginForm
      })
      .subscribe(res => {
        this.dialog.open(res.msg);
        if (res.success) {
          Cookies.set('userInfo', JSON.stringify(res.content));
          if (!res.content.guideId && res.content.roleTag === 'AppUser') {
            this.router.navigate(['/choose-guide']);
          } else {
            this.location.back();
          }
        }
      });
  }

  ngOnInit() {
    if (this.isLogin.isLogin()) {
      this.router.navigate(['/index/find']);
    }
  }
}

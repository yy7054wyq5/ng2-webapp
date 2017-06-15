import { Router } from '@angular/router';
import { DialogService } from './../../share/service/dialog.service';
import { ApiService } from './../../share/service/api.service';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less']
})
export class ResetPasswordComponent implements OnInit {
  resetForm = {
    passwordOld: null,
    passwordNew: null,
    userId: Cookies.getJSON('userInfo').userId
  };
  constructor(
    public api: ApiService,
    public dialog: DialogService,
    public router: Router
  ) { }

  reset() {
    this.api
      .ajax({
        method: 'post',
        url: '/api/account/modifypwd',
        body: this.resetForm
      })
      .subscribe(res => {
        this.dialog.open(res.msg);
        if (res.success) {
          Cookies.remove('userInfo');
          this.router.navigate(['/' + window['appTag'] + '/login']);
        }
      });
  }

  ngOnInit() {
  }

}

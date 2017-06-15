import { Router } from '@angular/router';
import { DialogService } from './../../share/service/dialog.service';
import { TranslatePipe } from './../../share/pipe/translate.pipe';
import { ApiService } from './../../share/service/api.service';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.less']
})
export class SetComponent implements OnInit {
  appTag: string = window['appTag'];
  userInfo: any;
  _initNickName: string;
  isUpdateNickName: boolean;
  uploader: FileUploader = new FileUploader({
    url: '/image/upload?type=1',
    method: 'POST',
    itemAlias: 'image',
    headers: [{ name: 'Accept', value: 'image/*' }]
  });

  constructor(
    public api: ApiService,
    public translate: TranslatePipe,
    public dialog: DialogService,
    public router: Router
  ) {}

  upLoad(ev) {
    const self = this;
    this.uploader.queue[0].onSuccess = (response, status, headers) => {
      // 上传文件成功
      if (status === 200) {
        // 上传文件后获取服务器返回的数据
        const tempRes = JSON.parse(response);
        if (tempRes.status === 'success') {
          self.userInfo = Cookies.getJSON('userInfo');
          self.userInfo['imagePath'] = tempRes.path;
          Cookies.set('userInfo', self.userInfo, {expires: 7});
        }
        self.uploader.clearQueue();
      } else {
        // 上传文件后获取服务器返回的数据错误
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
  }

  loginOut() {
    if (confirm(this.translate.transform('sure_to_out'))) {
      Cookies.remove('userInfo');
      this.router.navigate(['/' + window['appTag'] + '/index/find']);
    }
  }

  updateNickName(nickName) {
    if (nickName && nickName.length > 1 && nickName.length < 11) {
      if (nickName !== this._initNickName) {
        this.api
          .ajax({
            method: 'put',
            url: '/api/account/update',
            body: {
              userId: this.userInfo['userId'],
              nickname: nickName
            },
            downNewUserInfo: true
          })
          .subscribe(res => {
            this.dialog.open(res.msg);
            if (res.success) {
              this.isUpdateNickName = false;
              this.userInfo['nickname'] = nickName;
              this._initNickName = nickName;
            }
          });
      } else {
        this.isUpdateNickName = false;
      }
    } else {
      this.dialog.open(this.translate.transform('nickname_must_between'));
    }
  }

  ngOnInit() {
    this.userInfo = Cookies.getJSON('userInfo');
    this._initNickName = this.userInfo['nickname'];
  }

}

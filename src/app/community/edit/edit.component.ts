import { IsLoginGuard } from './../../share/guard/is-login.guard';
import { TranslatePipe } from './../../share/pipe/translate.pipe';
import { ApiService } from './../../share/service/api.service';
import { DialogService } from './../../share/service/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import * as Cookies from 'js-cookie';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class TopicEditComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: '/image/upload',
    method: 'POST',
    itemAlias: 'image',
    headers: [{ name: 'Accept', value: 'image/*' }]
  });

  /**
   * 论坛id
   */
  id;

  /**
   * 文字标题
   */
  title = '';

  /**
   * 文字内容
   */
  des = '';

  /**
   * 上传图片的路径集合
   */
  images = [];

  userId;

  constructor(private activeRouter: ActivatedRoute,
    private api: ApiService,
    private toast: DialogService,
    private location: Location,
    private router: Router,
    private islogin: IsLoginGuard
  ) {
    const self = this;
    this.activeRouter.params.subscribe(params => {
      self.id = params['id'];
      self.userId = JSON.parse(Cookies.get('userInfo')).userId;
    });
  }

  ngOnInit() {

  }

  /**
   * 上传之前把图片地址放入参数
   */
  addImageUrl() {
    this.uploader.addToQueue(this.images);
  }

  createTopic() {
    const self = this;
    if (this.title === undefined || this.title === '') {
      this.toast.open(new TranslatePipe().transform('title_content_must_not_null'), 300);
      return;
    }

    if (this.des === undefined || this.des === '') {
      this.toast.open(new TranslatePipe().transform('title_content_must_not_null'), 300);
      return;
    }

    let albumImages = '';
    for (let i = 0; i < this.images.length; i++) {
      albumImages += this.images[i].picKey;
      if (i < this.images.length - 1) {
        albumImages += ',';
      }
    }
    this.api
      .ajax({
        method: 'post',
        url: '/api/forum/create',
        body: {
          appId: window['appId'],
          forumId: this.id,
          userId: this.userId,
          name: this.title,
          detail: this.des,
          albumImages: albumImages
        }
      })
      .subscribe(res => {
        if (res.success === 1) {
          self.toast.open(new TranslatePipe().transform('oublish_post_success'), 3000);
          self.location.back();
        }

      });
  }


  upLoad(ev) {
    const self = this;
    this.uploader.queue[0].onSuccess = (response, status, headers) => {
      // 上传文件成功
      if (status === 200) {
        // 上传文件后获取服务器返回的数据
        const tempRes = JSON.parse(response);
        if (tempRes.status === 'success') {
          // self.images.push({
          //   picKey: tempRes.picKeys[0],
          //   path: tempRes.paths[0]
          // });
          self.images.push(tempRes);
        }
        self.uploader.clearQueue();
      } else {
        // 上传文件后获取服务器返回的数据错误
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
  }

  delect(ev) {
    for (let i = 0; i < this.images.length; i++) {
      if (ev.picKey === this.images[i].picKey) {
        this.images.splice(i, 1);
        break;
      }
    }
  }

  imageUploaded(ev) {
    console.log(ev);
  }

  imageRemoved(ev) {
    console.log(ev);
  }

}

import { IsLoginGuard } from './../../share/guard/is-login.guard';
import { TranslatePipe } from './../../share/pipe/translate.pipe';
import { DialogService } from './../../share/service/dialog.service';
import { ApiService } from './../../share/service/api.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-sublist',
  templateUrl: './sublist.component.html',
  styleUrls: ['./sublist.component.less']
})
export class SublistComponent implements OnInit {

  appTag = window['appTag'];

  hasForumEdit = true;

  /**
   * 论坛数据
   */
  forumInfo: any;

  /**
   * 当前页面
   */
  page = 1;


  /**
   * 跳转过来的论坛id
   */
  forumId;

  /**
   * 请求参数
   */
  body;

  refreshBody;

  /**
   * 查看大图的相册
   */
  albumImages = [];

  /**
   * 查看大图的位置
   */
  position = 0;

  userId = 0;

  constructor(private activeRouter: ActivatedRoute,
    private api: ApiService,
    private toast: DialogService,
    private router: Router,
    private isLoginGuard: IsLoginGuard) {
    const self = this;
    this.activeRouter.params.subscribe(params => {
      self.forumId = params['id'];
      if (Cookies.get('userInfo') !== undefined) {
        self.userId = Cookies.getJSON('userInfo').userId;
      }
    });

  }

  ngOnInit() {
    this.getTopics();
  }

  getTopics() {
    this.page = 1;
    this.api
      .ajax({
        method: 'post',
        url: '/api/forum/topics',
        body: {
          forumId: this.forumId,
          userId: this.userId,
          tag: 1
        }
      })
      .subscribe(res => {
        if (res.success === 1) {
          this.page = res.content.pager.currentPage;
          this.forumInfo = res.content.forumInfo;
        }
      });
  }








}

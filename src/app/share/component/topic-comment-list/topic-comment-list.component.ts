import { IsLoginGuard } from './../../guard/is-login.guard';
import { DialogService } from './../../service/dialog.service';
import { ApiService } from './../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-topic-comment-list',
  templateUrl: './topic-comment-list.component.html',
  styleUrls: ['./topic-comment-list.component.less']
})
export class TopicCommentListComponent implements OnInit {



  appTag = window['appTag'];

  /**
   * 回复；列表
   */
  comments: Array<object> = [];

  userId = 0;

  /**
   * 昵称
   */
  nickname: string = '';

  /**
   * 头像
   */
  imagePath: string = '';

  /**
   * 请求所需参数
   */
  loadBody: object;

  constructor(private activeRouter: ActivatedRoute,
    private api: ApiService,
    private toast: DialogService,
    private router: Router,
    private isLoginGuard: IsLoginGuard) {
    if (Cookies.get('userInfo') !== undefined) {
      this.userId = JSON.parse(Cookies.get('userInfo')).userId;
      this.nickname = JSON.parse(Cookies.get('userInfo')).nickname;
      this.imagePath = JSON.parse(Cookies.get('userInfo')).imagePath;
    }

    this.getCommentList();
  }

  ngOnInit() {
  }

  /**
 * @param page 获取回复的评论列表
 */
  getCommentList() {
    this.loadBody = {
      appId: window['appId'],
      tag: 2,
      page: 1,
      userId: this.userId
    }
    this.api
      .ajax({
        method: 'post',
        url: '/api/comment/mine',
        body: this.loadBody
      })
      .subscribe(res => {
        if (res.success === 1) {
          this.comments = new Array();
          for (let i = 0; i < res.content.comments.length; i++) {
            this.comments.push(res.content.comments[i]);
          }
          this.loadBody['page'] = res.content.pager.currentPage;
        }
      });
  }

  loadData(ev :object) {
    this.loadBody['page'] = ev['pager'].currentPage;
    if (this.loadBody['page'] === 1) {
      this.comments = new Array();
    }
    for (let i = 0; i < ev['comments'].length; i++) {
      this.comments.push(ev['comments'][i]);
    }

  }

}

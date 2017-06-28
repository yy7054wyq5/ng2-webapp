import { IsLoginGuard } from './../../share/guard/is-login.guard';
import { TranslatePipe } from './../../share/pipe/translate.pipe';
import { DialogService } from './../../share/service/dialog.service';
import { ApiService } from './../../share/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class TopicDetailComponent implements OnInit {


  /**
   * 帖子id
   */
  topicId: number;

  /**
   * 详情
   */
  detail: any;

  /**
   * 回复列表
   */
  comments = [];

  /**
   * 评论分页
   */
  page = 1;

  /**
   * 回复类容
   */
  commentContent: string;

  /**
   * 加载所需参数
   */
  loadBody: any;

  userId = 0;

  constructor(private activeRouter: ActivatedRoute,
    private api: ApiService,
    private toast: DialogService,
    private router: Router,
    private isLoginGuard: IsLoginGuard) {
    const self = this;
    this.activeRouter.params.subscribe(params => {
      self.topicId = params['id'];
      if (Cookies.get('userInfo') !== undefined) {
        self.userId = JSON.parse(Cookies.get('userInfo')).userId;
      }
      self.getTopicsDetail();
    });

  }

  ngOnInit() {

  }

  getTopicsDetail() {
    const self = this;
    this.api
      .ajax({
        method: 'post',
        url: '/api/forum/topicdetail/' + this.topicId,
        body: {
          appId: window['appId'],
          topicId: this.topicId,
          userId: this.userId
        }
      })
      .subscribe(res => {
        if (res.success === 1) {
          this.detail = res.content;
          this.page = 1;
          self.getCommentList();
        }

      });
  }

  /**
   *
   * @param page 获取回复的评论列表
   */
  getCommentList() {
    this.loadBody = {
      appId: window['appId'],
      resourceType: 2,
      resourceId: this.topicId,
      userId: this.userId,
      page: 1
    };
    this.api
      .ajax({
        method: 'get',
        url: '/api/comment/list',
        body: this.loadBody
      })
      .subscribe(res => {
        if (res.success === 1) {
          // if (this.page === 1) {
          //   this.comments = new Array();
          // }
          // for (let i = 0; i < res.content.comments.length; i++) {
          //   this.comments.push(res.content.comments[i]);
          // }
          // this.loadBody.page = res.content.pager.currentPage;
          this.loadData(res.content);
        }
      });
  }

  /**
   *
   * @param id 发表评论
   */
  sendConment(id) {
    if (this.jumpLogin()) {
      return;
    }
    if (this.commentContent === undefined || this.commentContent === '') {
      this.toast.open(new TranslatePipe().transform('content_cannot_be_empty'), 3000);
      return;
    }
    this.api
      .ajax({
        method: 'get',
        url: '/api/comment/publish',
        body: {
          appId: window['appId'],
          resourceType: 2,
          resourceId: this.topicId,
          userId: this.userId,
          content: this.commentContent,
        }
      })
      .subscribe(res => {
        if (res.success === 1) {
          this.commentContent = '';
          this.getTopicsDetail();
        }
      });
  }

  /**
   *
   * @param id 点赞或取消点赞
   */
  clickZan(id) {
    if (this.jumpLogin()) {
      return;
    }
    this.api
      .ajax({
        method: 'get',
        url: '/api/forum/thumbtopic',
        body: {
          appId: window['appId'],
          topicId: this.topicId,
          userId: this.userId
        }
      })
      .subscribe(res => {
        if (res.success === 1) {
          this.getTopicsDetail();
        }
      });
  }

  jumpLogin() {
    if (!this.isLoginGuard.isLogin()) {// 没有登录
      return true;
    }
    return false;
  }

  /**
   *
   * @param ev 加载回调
   */
  loadData(ev) {
    this.loadBody.page = ev.pager.currentPage;
    if (this.loadBody.page === 1) {
      this.comments = new Array();
    }
    for (let i = 0; i < ev.comments.length; i++) {
      this.comments.push(ev.comments[i]);
    }
  }

}

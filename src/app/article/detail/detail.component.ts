import { IsLoginGuard } from './../../share/guard/is-login.guard';
import { TranslatePipe } from './../../share/pipe/translate.pipe';
import { DialogService } from './../../share/service/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../share/service/api.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class ArticleDetailComponent implements OnInit {
  /**
   * 文章id
   */
  articleId: number;

  loadBody: any;

  /**
   * 评论回复内容
   */
  articleConment = '';

  /**
   * 文章详情
   */
  detail: any;

  /**
   * 回复内容
   */
  comments = [];

  usereId = 0;

  constructor(private sanitizer: DomSanitizer,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private toast: DialogService,
    private api: ApiService,
    private isLoginGuard: IsLoginGuard,
    private transform: TranslatePipe) {
    const self = this;
    this.activeRouter.params.subscribe(params => {
      self.articleId = params['id'];
      if (Cookies.get('userInfo') !== undefined) {
        JSON.parse(Cookies.get('userInfo')).userId;
      }
      self.getArticleDetail();
    });
  }

  ngOnInit() {
  }

  /**
 * 获取文章详情
 */
  getArticleDetail() {
    this.api
      .ajax({
        method: 'get',
        url: '/api/article/detail/' + this.articleId,
        body: {
          appId: window['appId'],
          articleId: this.articleId,
        }
      })
      .subscribe(res => {
        if (res.success === 1) {
          this.detail = res.content;
          this.getArticleCommentList();
        }
      });
  }

  /**
* 获取文章回复列表
*/
  getArticleCommentList() {
    this.loadBody = {
      appId: window['appId'],
      resourceType: 1,
      resourceId: this.articleId,
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
          if (this.loadBody.page === 1) {
            this.comments = new Array();
          }
          for (let i = 0; i < res.content.comments.length; i++) {
            this.comments.push(res.content.comments[i]);
          }
          this.loadBody.page = res.content.pager.currentPage;
        }
      });
  }

  loadData(ev) {
    this.comments.concat(ev.comments);
  }



  /**
   * @param id 发表评论
   */
  sendConment(id) {
    if (this.jumpLogin()) {
      return;
    }
    if (this.articleConment === undefined || this.articleConment === '') {
      this.toast.open(this.transform.transform('content_cannot_be_empty'), 3000);
      return;
    }
    this.api
      .ajax({
        method: 'get',
        url: '/api/comment/publish',
        body: {
          appId: window['appId'],
          resourceType: 1,
          resourceId: this.articleId,
          content: this.articleConment,
          userId: this.usereId
        }
      })
      .subscribe(res => {
        if (res.success === 1) {
          this.articleConment = '';
          this.getArticleDetail();
        }
      });
  }


  trust(html) {
    if (html === '' || html === undefined) {
      return '--';
    }
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  jumpLogin() {
    if (!this.isLoginGuard.isLogin()) {// 没有登录
      return true;
    }
    return false;
  }

}

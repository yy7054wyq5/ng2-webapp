import { ApiService } from './../../../share/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-class-0',
  templateUrl: './index-class-0.component.html',
  styleUrls: ['./index-class-0.component.less']
})
export class ArticleIndexClass0Component implements OnInit {

  loadBody;

  appTag = window['appTag'];

  /**
   * 文章分类Id
   */
  categoryId = 0;

  title: string;

  /**
   * 文章列表
   */
  articleList = [];

  constructor(private activeRouter: ActivatedRoute,
    private api: ApiService,
    private router: Router) {

  }

  ngOnInit() {
    this.getArticleList();
  }

  /**
   * 获取文章列表
   */
  getArticleList() {
    this.loadBody = {
      appId: window['appId'],
      categoryId: this.categoryId,
      page: 1
    };
    this.api
      .ajax({
        method: 'get',
        url: '/api/article/list',
        body: this.loadBody
      })
      .subscribe(res => {
        if (res.success === 1) {
          if (this.loadBody.page === 1) {
            this.articleList = new Array();
          }
          for (let i = 0; i < res.content.articles.length; i++) {
            this.articleList.push(res.content.articles[i]);
          }
          this.loadBody.page = res.content.pager.currentPage;
        }
      });
  }



  /**
* @param ev 加载回调
*/
  loadData(ev) {
    this.loadBody.page = ev.pager.currentPage;
    if (this.loadBody.page === 1) {
      this.articleList = new Array();
    }
    for (let i = 0; i < ev.articles.length; i++) {
      this.articleList.push(ev.articles[i]);
    }
  }



}

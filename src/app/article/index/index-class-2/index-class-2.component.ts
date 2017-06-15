import { ApiService } from './../../../share/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-class-2',
  templateUrl: './index-class-2.component.html',
  styleUrls: ['./index-class-2.component.less']
})
export class ArticleIndexClass2Component implements OnInit {
  /**
   * 总分类的data
   */
  navdata = [];

  appTag = window['appTag'];

  navMenu = [];

  loadBody;

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
    private router: Router) { }

  ngOnInit() {
    this.getArticleCategory();
  }

  /**
   * 获取文章分类
   */
  getArticleCategory() {
    this.api
      .ajax({
        method: 'post',
        url: '/api/article/category',
        body: {
          appId: window['appId'],
        }
      })
      .subscribe(res => {
        if (res.success === 1) {
          this.navdata = res.content;
          if (this.navdata.length > 0) {
            this.getArticleChildCategory(this.navdata[0].id);
          }
        }
      });
  }

  /**
   * 获取文章子分类(分类Id)
   */
  getArticleChildCategory(id) {
    this.api
      .ajax({
        method: 'post',
        url: '/api/article/childcategory',
        body: {
          appId: window['appId'],
          categoryId: id
        }
      })
      .subscribe(res => {
        if (res.success === 1) {
          if (res.content !== undefined) {
            if (res.content.length > 0) {
              this.navMenu = res.content;
              this.categoryId = this.navMenu[0].id;
              this.getArticleList();
            }
          }
        }
      });
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
   * 获取二级分类
   */
  getChildEvent(ev) {
    this.navMenu = new Array();
    this.articleList = new Array();
    this.getArticleChildCategory(ev);
  }

  addBackgroundImage(ev) {
    return 'url(' + ev + ')';
  }

  loadData(ev) {
    this.loadBody.page = ev.pager.currentPage;
    if (this.loadBody.page === 1) {
      this.articleList = new Array();
    }
    for (let i = 0; i < ev.articles.length; i++) {
      this.articleList.push(ev.articles[i]);
    }

  }

  getListEvent(id) {
    this.loadBody.categoryId = id;
    this.getArticleList();
  }

}

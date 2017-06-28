import { ApiService } from './../../../share/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-class-3',
  templateUrl: './index-class-3.component.html',
  styleUrls: ['./index-class-3.component.less']
})
export class ArticleIndexClass3Component implements OnInit {

  /**
   * 总分类的data
   */
  navdata = [];

  navMenu = [];

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
          if (res.content.length > 0) {
            this.navdata = res.content;
            if (this.navdata.length > 0) {
              this.getArticleChildCategory(this.navdata[0].id);
            } else {
              this.navMenu = new Array();
            }
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
            } else {
              this.navMenu = [];
            }
          } else {
            this.navMenu = [];
          }
        }
      });
  }

  /**
   * 获取文章列表
   */
  getArticleList(id) {
    this.api
      .ajax({
        method: 'get',
        url: '/api/article/list',
        body: {
          appId: window['appId'],
          categoryId: id
        }
      })
      .subscribe(res => {
        if (res.success === 1) {
          if (res.content.length > 0) {

          }
        }
      });
  }

  /**
   * 获取二级分类
   */
  getChildEvent(ev) {
    this.getArticleChildCategory(ev);
  }

  addBackgroundImage(ev) {
    return 'url(' + ev + ')';
  }



}

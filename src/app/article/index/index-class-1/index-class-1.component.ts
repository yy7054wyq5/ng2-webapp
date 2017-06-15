import { ApiService } from './../../../share/service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-class-1',
  templateUrl: './index-class-1.component.html',
  styleUrls: ['./index-class-1.component.less']
})
export class ArticleIndexClass1Component implements OnInit {

  appTag = window['appTag'];

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


  /**
   * 总分类的data
   */
  navdata = [];

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
            this.categoryId = res.content[0].id;
            this.getArticleList();
          } else {
            this.articleList = new Array();
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
   * 获取分类列表
   */
  getChildEvent(ev) {
    this.categoryId = ev;
    this.getArticleList();
  }

  /**
*
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

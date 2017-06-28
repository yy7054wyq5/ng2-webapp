import { ApiService } from './../../share/service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ArticleListComponent implements OnInit {

  loadBody;

  /**
   * 文章分类Id
   */
  categoryId;

  title: string;

  /**
   * 文章列表
   */
  articleList = [];

  /**
   * 页码
   */
  page = 1;


  constructor(private activeRouter: ActivatedRoute,
    private api: ApiService,
    private router: Router) {
    const self = this;
    this.activeRouter.params.subscribe(params => {
      self.categoryId = params['id'];
      self.title = params['title'];
      self.getArticleList();
    });
  }

  ngOnInit() {
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
          // this.articleList = new Array();
          // for (let i = 0; i < res.content.articles.length; i++) {
          //   this.articleList.push(res.content.articles[i]);
          // }
          // this.loadBody.page = res.content.pager.currentPage;
          this.loadData(res.content);
        }
      });
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

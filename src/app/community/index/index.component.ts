import { Router } from '@angular/router';
import { ApiService } from './../../share/service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class CommunityIndexComponent implements OnInit {


  appTag = window['appTag'];

  /**
   * 页面需要显示的数据列表
   */
  data = [];

  /**
   * 当前页面
   */
  page = 1;

  /**
   * 加载的body
   */
  loadBody;


  constructor(private api: ApiService,
    private router: Router) {
    this.getForumList();
  }

  getForumList() {
    this.loadBody = {
      appId: window['appId'],
      page: 1
    };
    this.api
      .ajax({
        method: 'get',
        url: '/api/forum/list',
        body: this.loadBody
      })
      .subscribe(res => {
        this.data = new Array();
        for (let i = 0; i < res.content.forums.length; i++) {
          this.data.push(res.content.forums[i]);
        }
        this.loadBody.page = res.content.pager.currentPage;
      });
  }

  ngOnInit() {

  }

  /**
   * @param ev 加载回调
   */
  loadData(ev) {
    this.loadBody.page = ev.pager.currentPage;
    if (this.loadBody.page === 1) {
      this.data = new Array();
    }
    for (let i = 0; i < ev.forums.length; i++) {
      this.data.push(ev.forums[i]);
    }
  }

}

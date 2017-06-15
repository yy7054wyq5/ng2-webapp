import { IsLoginGuard } from './../../guard/is-login.guard';
import { DialogService } from './../../service/dialog.service';
import { ApiService } from './../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import * as Cookies from 'js-cookie';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.less']
})
export class TopicListComponent implements OnInit {

  appTag: string = window['appTag'];

  hasForumEdit = true;

  /**
   * 页面需要显示的数据列表
   */
  datas: any;

  /**
   * 跳转过来的论坛id
   */
  @Input()
  forumId: number;

  refreshBody: any;

  /**
   * 查看大图的相册
   */
  albumImages: any;

  /**
   * 查看大图的位置
   */
  position = 0;

  userId = 0;


  @Input()
  set setTag(tag: number) {
    this.tag = tag;
  }

  /**
    * 1表示普通帖子  2表示我的帖子
    */
  tag = 0;

  /**
   * 加载参数
   */
  loadBody: any;

  constructor(private activeRouter: ActivatedRoute,
    private api: ApiService,
    private toast: DialogService,
    private router: Router,
    private isLoginGuard: IsLoginGuard
  ) {
    if (Cookies.get('userInfo') !== undefined) {
      this.userId = JSON.parse(Cookies.get('userInfo')).userId;
    }
  }

  ngOnInit() {
    this.getTopics();
  }

  getTopics() {
    if (this.forumId === undefined) {
      this.loadBody = {
        appId: window['appId'],
        page: 1,
        tag: this.tag,
        pageCount: 10,
        userId: this.userId
      }
    } else {
      this.loadBody = {
        appId: window['appId'],
        page: 1,
        tag: this.tag,
        pageCount: 10,
        forumId: this.forumId,
        userId: this.userId
      }
    }
    this.api
      .ajax({
        method: 'post',
        url: '/api/forum/topics',
        body: this.loadBody,
      })
      .subscribe(res => {
        console.log(res.content);
        if (this.loadBody.page === 1) {
          this.datas = new Array();
        }
        for (let i = 0; i < res.content.topics.length; i++) {
          this.datas.push(res.content.topics[i]);
        }
        this.loadBody.page = res.content.pager.currentPage;
      });
  }

  /**
 * 
 * @param ev 加载回调
 */
  loadData(ev: any) {
    this.datas = this.datas.concat(ev);
  }

  refreshData(ev: any){
    this.datas = ev;
  }

  /**
 * 
 * @param id 点赞或取消点赞
 */
  clickZan(ev: any, id: number, position: number) {
    ev.stopPropagation();
    if (this.jumpLogin()) {
      return;
    }
    this.api
      .ajax({
        method: 'get',
        url: '/api/forum/thumbtopic',
        body: {
          appId: window['appId'],
          topicId: id,
          userId: this.userId
        }
      })
      .subscribe(res => {
        if (res.success === 1) {
          this.datas[position].haveThumb = !this.datas[position].haveThumb;
          const haveThumb: boolean = this.datas[position].haveThumb;
          if (haveThumb) {
            this.datas[position].thumbNum++;
          } else {
            this.datas[position].thumbNum--;
          }
        }
      });
  }



  /**
   * ev.stopPropagation() 阻止事件冒泡
   * @param ev 查看大图
   */
  viewBigPicture(ev: any, data: any, i: number) {
    ev.stopPropagation();
    this.albumImages = data;
    this.position = i;
  }

  jumpLogin(): boolean {
    if (!this.isLoginGuard.isLogin()) {// 没有登录
      return true;
    }
    return false;
  }

}

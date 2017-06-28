import { ApiService } from './../../service/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
declare const WeixinJSBridge: any;

@Component({
  selector: 'app-load-and-refresh',
  templateUrl: './load-and-refresh.component.html',
  styleUrls: ['./load-and-refresh.component.less']
})
export class LoadAndRefreshComponent implements OnInit {
  refresh_leaveTop = -1; // 圈圈的top值
  refresh_ajax = false; // 发送请求时，圈圈开始转
  _refresh_initScrollY = 0;
  _refresh_data: Array<object>;

  load_class = 'hide';
  load_no_data = false;
  _load_data: Array<object>;

  totalPage: number; // 记录翻页总页数

  @Input() disabledRefresh: boolean; // 用于关闭刷新
  @Input() disabledLoad: boolean; // 用于关闭加载
  @Input() url: string;
  @Input() body: any;
  @Input() dataKey: any;
  @Output() onRefresh: EventEmitter<object> = new EventEmitter<object>();
  @Output() onLoad: EventEmitter<object> = new EventEmitter<object>();

  constructor(
    private api: ApiService
  ) { }

  panstart(action: any) {
    if (this.disabledLoad) { return; };
    const clientHeight = window.innerHeight; // 设备高度
    const contentHeight = document.body.parentElement.offsetHeight; // html的高度
    const scrollMove = contentHeight - clientHeight; // 滚动的距离
    const scrollY = window.scrollY; // 滚动高度
    if (scrollY === scrollMove && scrollY !== 0) {
      if (this.load_no_data) { this.load_no_data = false; }
      // Object.assign(this.load_body, this.body); // 合并到load_body
      this.ajaxLoadData();
    }
  }

  pandown(action: object) {
    // 判断是否微信浏览
    if (typeof (WeixinJSBridge) === 'undefined') {
      if (action['deltaY'] > 0) {
        if (window.scrollY === 0) {
          this.refresh_leaveTop = 2.5;
        }
      }
    }
  }

  panend(action: object) {
    if (this.disabledRefresh) { return; };
    if (action['deltaY'] > 0 && this.refresh_leaveTop === 2.5) {
      this.refresh_ajax = true;
      this.ajaxRefreshData();
    }
  }

  ajaxRefreshData() {
    this.body.page = 1;
    // 获取list
    this.api
      .ajax({
        method: 'get',
        url: this.url,
        body: this.body,
        noLoading: true
      })
      .subscribe(res => {
        if (res.success) {
          this.refresh_leaveTop = -1;
          this.refresh_ajax = false;
          this._refresh_data = this.dataKey ? res.content[this.dataKey] : res.content;
          this.onRefresh.emit(this._refresh_data);
        }
      });
  }

  _noData() {
    this.load_no_data = true;
    this._load_data = [];
    setTimeout(() => this.load_no_data = false, 1000);
  }

  ajaxLoadData() {
    this.body.page += 1;
    if (this.body.page > this.totalPage) {
      this._noData();
      return;
    }
    this.load_class = 'block';
    this.api
      .ajax({
        method: 'get',
        url: this.url,
        body: this.body,
        noLoading: true
      })
      .subscribe(res => {
        if (res.success) {
          this.totalPage = res.content.pager.totalPage;
          this.load_class = 'hide';
          this._load_data = this.dataKey ? res.content[this.dataKey] : res.content;
          if (this._load_data.length === 0 || this.body.page > this.totalPage) {
            this._noData();
          }
          this.onLoad.emit(this._load_data);
        }
      });
  }

  ngOnInit() {
    console.log(this.body);
  }
}

import { ApiService } from './../../service/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import 'hammerjs';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.less']
})
export class LoadComponent implements OnInit {
  loadStatus = 'hide';
  data;
  noData = false;
  pageIndex = 1;
  totalPage = 2;
  @Input() url;
  @Input() method;
  @Output() onReceive: EventEmitter<object> = new EventEmitter<object>();
  loadData() {
    this.onReceive.emit(this.data);
  }
  constructor(
    private api: ApiService
  ) { }

  panstart() {
    const clientHeight = window.innerHeight; // 设备高度
    const contentHeight = document.body.clientHeight; // 内容高度
    const scrollMove = contentHeight - clientHeight;
    const scrollY = window.scrollY; // 滚动高度
    if (scrollY === scrollMove) {
      this.loadStatus = 'block';
      this.pageIndex += 1;
      this.ajaxData();
    }
  }

  ajaxData() {
    this.api
      .ajax({
        method: this.method,
        url: this.url,
        body: {
          page: this.pageIndex
        },
        noLoading: true
      })
      .subscribe(res => {
        if (res.success) {
          this.loadStatus = 'hide';
          this.data = res.content.hotProducts;
          this.pageIndex = res.content.pager.currentPage;
          this.totalPage = res.content.pager.totalPage;
          if (res.content.hotProducts.length === 0) {
            this.noData = true;
            setTimeout(() => this.noData = false, 1000);
          }
          this.loadData();
        }
      });
  }

  ngOnInit() {
  }

}

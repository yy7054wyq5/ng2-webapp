import { ApiService } from './../../service/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import 'hammerjs'; // 手势

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.less']
})
export class RefreshComponent implements OnInit {
  loading = false;
  ajax = false;
  data;
  initScrollY = 0;
  @Input() method;
  @Input() url;
  @Input() body;
  @Output() onReceive: EventEmitter<object> = new EventEmitter<object>();
  receiveTheData() {
    this.onReceive.emit(this.data);
  }
  constructor(
    private api: ApiService
  ) { }

  pandown(action) {
    if (action.deltaY > 0) {
      if (window.scrollY === 0) {
        this.loading = true;
      } else {
        // window.scroll(0, this.initScrollY - action.deltaY);
      }
    }
  }

  panend(action) {
    if (action.deltaY > 0 && this.loading) {
      this.ajax = true;
      this.ajaxData();
    }
  }

  ajaxData() {
    // 获取list
    this.api
      .ajax({
        method: this.method,
        url: this.url,
        body: this.body,
        noLoading: true
      })
      .subscribe(res => {
        if (res.success) {
          this.loading = false;
          this.ajax = false;
          this.data = res.content;
          this.receiveTheData();
        }
      });
  }

  ngOnInit() {
    // this.ajaxData();
  }
}

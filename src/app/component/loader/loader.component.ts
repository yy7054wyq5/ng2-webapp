import { ApiService } from './../../service/api.service';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import 'hammerjs'; // 手势

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent implements OnInit, OnChanges {
  loading = false;
  initTop = 0;
  downMove = 0;
  data;
  @Input() method;
  @Input() url;
  @Input() body;
  @Input() leaveTop;
  @Output() onReceive = new EventEmitter();
  receiveTheData() {
    this.onReceive.emit(this.data);
  }
  constructor(
    private api: ApiService
  ) { }

  pandown(action) {
    if (action.deltaY > 0) {
      if (window['scrollY'] === 0) {
        this.loading = true;
        this.downMove = action.deltaY / window['rem'];
        if (this.downMove > 3) {
          this.downMove = 3;
        }
        this.leaveTop = this.initTop + this.downMove;
      }
    }
  }

  panend(action) {
    if (action.deltaY > 0 && this.loading) {
      this.ajaxData();
    }
  }

  ajaxData() {
    // 获取list
    this.api
      .ajax({
        method: this.method,
        url: this.url,
        body: this.body
      })
      .subscribe(res => {
        if (res.success) {
          this.loading = false;
          this.leaveTop = this.initTop;
          this.data = res.content;
          this.receiveTheData();
        }
      });
  }

  ngOnInit() {
    this.initTop = this.leaveTop;
    this.ajaxData();
  }

  ngOnChanges() {
  }
}

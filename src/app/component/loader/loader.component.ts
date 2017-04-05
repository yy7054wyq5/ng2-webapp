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
  ajax = false;
  data;
  @Input() method;
  @Input() url;
  @Input() body;
  @Output() onReceive = new EventEmitter();
  receiveTheData() {
    this.onReceive.emit(this.data);
  }
  constructor(
    private api: ApiService
  ) { }


  panup(action) {
    console.log(action);
  }

  pandown(action) {
    if (action.deltaY > 0) {
      if (window['scrollY'] === 0) {
        this.loading = true;
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
        body: this.body
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
    this.ajaxData();
  }

  ngOnChanges() {
    this.ajaxData();
  }
}

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
  @Input() url;
  @Input() method;
  @Input() list;
  @Output() onReceive: EventEmitter<object> = new EventEmitter<object>();
  loadData() {
    this.onReceive.emit(this.data);
  }
  constructor(
    private api: ApiService
  ) { }

  panup() {
    this.loadStatus = 'block';
    this.api
      .ajax({
        method: this.method,
        url: this.url,
        body: {
          page: 2
        },
        noLoading: true
      })
      .subscribe(res => {
        if (res.success) {
          this.loadStatus = 'hide';
          this.data = res.content.hotProducts;
          this.loadData();
        }
      });
  }

  ngOnInit() {
  }

}

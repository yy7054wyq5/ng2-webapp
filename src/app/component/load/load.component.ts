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
  @Input() body;
  @Input() list;
  @Output() onReceive: EventEmitter<object> = new EventEmitter<object>();
  loadData() {
    this.onReceive.emit(this.data);
  }
  constructor() { }

  panup() {

  }
  ngOnInit() {
    console.log(this.list);
  }

}

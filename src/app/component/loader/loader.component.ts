import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import 'hammerjs'; // 手势

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent implements OnInit, OnChanges {
  initTop = 0;
  @Input() isloading;
  @Input() leaveTop;
  @Input() move;
  @Output() outEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.initTop = this.leaveTop;
  }

  ngOnChanges() {
    if (this.initTop && this.move) {
      if (this.move > 3) {
        this.move = 3;
      }
      this.leaveTop = this.initTop + this.move;
    }
  }
}

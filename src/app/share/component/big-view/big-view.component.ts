import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-big-view',
  templateUrl: './big-view.component.html',
  styleUrls: ['./big-view.component.less']
})
export class BigViewComponent implements OnInit {

  /**
   * 图片资源
   */
  @Input()
  images: Array<object> = [];

  /**
   * 当前图片位置
   */
  @Input()
  position = 0;

  constructor() { }

  ngOnInit() {
    // setInterval(() => {
    //   if (this.position === this.images.length - 1) {
    //     this.position = 0;
    //   } else {
    //     this.position++;
    //   }
    // }, 1000);
  }

  swipeRight(ev: any): void {
    if (this.position === 0) {
      this.position = this.images.length - 1;
    } else {
      this.position--;
    }
  }

  swipeLeft(ev: any): void {
    if (this.position === this.images.length - 1) {
      this.position = 0;
    } else {
      this.position++;
    }
  }



}

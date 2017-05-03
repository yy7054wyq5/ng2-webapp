import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-top',
  templateUrl: './back-top.component.html',
  styleUrls: ['./back-top.component.less']
})
export class BackTopComponent implements OnInit {
  showBackTop = false;
  win = window;
  doc = document;
  constructor() { }

  backTop(rate) {
    // 原文地址：http://www.zhangxinxu.com/wordpress/2017/01/share-a-animation-algorithm-js/
    // 滚动到顶部缓动实现
    // rate表示缓动速率，默认是2
    const doc = this.doc.body.scrollTop ? this.doc.body : this.doc.documentElement;
    let scrollTop = doc.scrollTop;

    const top = function () {
      scrollTop = scrollTop + (0 - scrollTop) / (rate || 2);

      // 临界判断，终止动画
      if (scrollTop < 1) {
        doc.scrollTop = 0;
        return;
      }
      doc.scrollTop = scrollTop;
      // 动画gogogo!
      requestAnimationFrame(top);
    };
    top();
  }

  ngOnInit() {
    const clientHeight = this.doc.documentElement.clientHeight;
    this.win.onscroll = (event) => {
      const leaveTop = this.win['scrollY'];
      if (leaveTop >= clientHeight / 2) {
        this.showBackTop = true;
      } else {
        this.showBackTop = false;
      }
    };
  }

}

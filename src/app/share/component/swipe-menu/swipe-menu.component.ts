import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from './../../service/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-swipe-menu',
  templateUrl: './swipe-menu.component.html',
  styleUrls: ['./swipe-menu.component.less']
})
export class SwipeMenuComponent implements OnInit {
  private product: Array<object> = [];
  private indexActive = 0; // 选中导航索引
  public widthNum = '0'; // ul.swipemenu宽度
  public leftPosi = '0'; // ul.swipemenu定位left值
  private currentCount = 0; // 当前移动li索引
  remRate = $(window).width() / 10; // 1rem等于多少px比例

  /**
   * 输出导航id
   */
  @Input() inputId: number;
  @Input() productList: Array<object>;
  @Input() url: string;
  @Input() categoryId: string;
  @Output() childEvent = new EventEmitter<any>();
  body = {};

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    if (!this.categoryId) {
      this.categoryId = 'categoryId';
    }
    // console.log(this.productList);
    // 设置ul.swipemenu的宽度
    setTimeout(() => {
      // li的font-size 单位rem
      const liFontSize = parseFloat($('.swipemenu li').css('font-size')) / this.remRate;
      this.productList.forEach((val, index) => {
        this.widthNum = parseFloat(this.widthNum) + (val['name'].length * liFontSize + 0.5) + 'rem';
      });

    }, 0);
  }

  // 导航左滑
  swipeLeft() {
    // 当前li宽度
    const liwid = $('.swipemenu >li:eq(' + this.currentCount + ')').width();
    // 允许滑动范围
    if (parseFloat(this.widthNum) + parseFloat(this.leftPosi) >= 10) {
      this.leftPosi = (parseFloat(this.leftPosi) - (liwid / this.remRate + 0.5)) + 'rem';
      this.currentCount++;
    }
    // console.log(this.currentCount);
  }
  // 导航右滑
  swipeRight() {
    // 当前li宽度
    const liwid = $('.swipemenu >li:eq(' + (this.currentCount - 1) + ')').width();
    // 允许滑动范围
    if (this.currentCount - 1 >= 0) {
      this.leftPosi = (parseFloat(this.leftPosi) + (liwid / this.remRate + 0.5)) + 'rem';
      this.currentCount--;
    }
    // console.log(this.currentCount);
  }

  // 点击导航
  fireChildEvent(ops: object) {
    console.log(ops);
    this.indexActive = ops['index'];
    // 如果backId为true,直接给父组件id
    if (this.inputId) {
      this.childEvent.emit(ops['id']);
      return;
    }
    // 设置请求参数
    this.body[this.categoryId] = ops['id'];
    this.api
      .ajax({
        method: 'get',
        url: this.url + '/' + ops['id'],
        body: this.body
      })
      .subscribe(res => {
        // console.log(res.content.products);
        res.content[this.categoryId] = ops['id'];
        this.childEvent.emit(res.content);
      });
    // this.childEvent.emit(ops);
  }
}

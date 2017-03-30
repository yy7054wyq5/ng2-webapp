import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import 'hammerjs'; // 手势

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
})

export class CarouselComponent implements OnInit, OnDestroy {
  defaultImage = 'assets/lazy_default.png';
  translateLeft; // div平移css
  distance; // 每次移动的距离
  initTranslateLeft = 0; // 每次移动后记录移动的距离
  limitDistance = (10 * window['rem'] / window['dpr']) / 2; // 半屏宽度
  pointer = 0; // 小圆点高亮,图片索引
  setIntervalId;
  setTimeOutId;
  @Input() data;

  // 头尾移动边界值
  limitMove(index: number, move: number) {
    if (index === 0 && move >= this.limitDistance) {
      return this.limitDistance;
    } else if (index === this.data.length - 1 && move <= -this.limitDistance) {
      return -this.limitDistance;
    }
    return move;
  }

  state(index: number) {
    const slideMove = -index * this.limitDistance * 2;
    this.translateLeft = 'translate3d(' + slideMove + 'px,0px,0px)';
    this.initTranslateLeft = slideMove;
    this.pointer = index;
  }

  panstart() {
    clearInterval(this.setIntervalId);
  }

  panmove(index: number, action: any) {
    const deltaX: number = action.deltaX;
    this.distance = deltaX * window['dpr'];
    this.translateLeft = 'translate3d(' + (this.initTranslateLeft + this.limitMove(index, this.distance)) + 'px,0px,0px)';
  }

  panend(index: number, action: object) {
    this.intervalCarousel();
    const move: number = this.limitMove(index, this.distance);
    const halfClientWidth: number = this.limitDistance;
    if (index === 0 && move > 0) {
      this.state(0);
    } else if (index === this.data.length - 1 && move < 0) {
      this.state(this.data.length - 1);
    } else {
      if (move > 0 && move < halfClientWidth) { // 右移未超过半屏
        this.state(index);
      } else if (move > 0 && move >= halfClientWidth) { // 右移超过半屏
        this.state(index - 1);
      } else if (move < 0 && move > -halfClientWidth) { // 左移未超过半屏
        this.state(index);
      } else if (move < 0 && move <= -halfClientWidth) { // 左移超过半屏
        this.state(index + 1);
      }
    }
  }

  intervalCarousel() {
    let index: number = this.pointer;
    const max: number = this.data.length - 1;
    this.setIntervalId = setInterval(() => {
      if (index === max) {
        index = 0;
      } else {
        index += 1;
      }
      this.state(index);
    }, 2000);
  }

  constructor() { }

  ngOnInit() {
    this.intervalCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.setIntervalId);
  }

}

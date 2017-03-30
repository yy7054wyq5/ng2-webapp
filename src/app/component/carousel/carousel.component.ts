import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import 'hammerjs'; // 手势

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
})

export class CarouselComponent implements OnInit {
  defaultImage;
  translateLeft; // div平移css
  distance; // 每次移动的距离
  initTranslateLeft = 0; // 每次移动后记录移动的距离
  limitDistance = (10 * window['rem'] / window['dpr']) / 2;
  @Input() data;

  limitMove(index: number, move: number) {
    if (index === 0 && move >= this.limitDistance) {
      return this.limitDistance;
    } else if (index === this.data.length - 1 && move <= -this.limitDistance) {
      return -this.limitDistance;
    }
    return move;
  }

  state(index) {
    this.translateLeft = 'translate3d(' + -index * this.limitDistance * 2 + 'px,0px,0px)';
    this.initTranslateLeft = -index * this.limitDistance * 2;
  }

  panmove(index: number, action: any) {
    const deltaX: number = action.deltaX;
    this.distance = deltaX * window['dpr'];
    this.translateLeft = 'translate3d(' + (this.initTranslateLeft + this.limitMove(index, this.distance)) + 'px,0px,0px)';
  }

  panend(index: number, action: object) {
    const move: number = this.limitMove(index, this.distance);
    if (index === 0 && move > 0) {
      this.state(0);
    } else if (index === this.data.length - 1 && move < 0) {
      this.state(this.data.length - 1);
    } else {
      if (move > 0 && move < this.limitDistance) { // 右移未超过半屏
        this.state(index);
      } else if (move > 0 && move >= this.limitDistance) { // 右移超过半屏
        this.state(index - 1);
      } else if (move < 0 && move > -this.limitDistance) { // 左移未超过半屏
        this.state(index);
      } else if (move < 0 && move <= -this.limitDistance) { // 左移超过半屏
        this.state(index + 1);
      }
    }
  }
  constructor() { }

  ngOnInit() {
    this.defaultImage = 'assets/lazy_default.png';
  }

}

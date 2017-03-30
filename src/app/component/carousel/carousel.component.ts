import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import 'hammerjs'; // 手势

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
  animations: []
})

export class CarouselComponent implements OnInit {
  boxWidth;
  slowSlide;
  translateLeft;
  defaultImage;
  @Input() data;

  // pan(index: number, action: any) {
  //   this.slowSlide = true;
  //   const length: number = this.data.length;
  //   const type: string = action.type;
  //   const srcEventType: string = action.srcEvent.type;
  //   const maxLeft: number = (length - 1) * -10;
  //   const deltaX: number = action.deltaX;
  //   const move = window['px2rem'](deltaX * window['dpr']);

  //   if (type === 'panstart') {
  //     this.initMoveLeft = this.moveLeft;
  //   }else if (type === 'panleft') {
  //     if (this.moveLeft <= maxLeft) {
  //       if (srcEventType === 'pointermove') {
  //         this.slowSlide = false;
  //         this.moveLeft = this.initMoveLeft + move;
  //         if (this.moveLeft <= maxLeft - 5) {
  //           this.moveLeft = maxLeft - 5;
  //         }
  //       } else if (srcEventType === 'pointerup') {
  //         this.moveLeft = maxLeft;
  //       }
  //       return;
  //     }
  //     index = index + 1;
  //     this.moveLeft = index * -10;
  //   } else if (type === 'panright') {
  //     if (this.moveLeft >= 0) {
  //       if (srcEventType === 'pointermove') {
  //         this.slowSlide = false;
  //         this.moveLeft = this.initMoveLeft + move;
  //         if (this.moveLeft >= 5) {
  //           this.moveLeft = 5;
  //         }
  //       } else if (srcEventType === 'pointerup') {
  //         this.moveLeft = 0;
  //       }
  //       return;
  //     }
  //     index = index - 1;
  //     this.moveLeft = index * -10;
  //   } else { // panend
  //     const toRight: boolean = (this.moveLeft < maxLeft && this.moveLeft >= maxLeft - 5);
  //     const toLeft: boolean = (this.moveLeft <= 5 && this.moveLeft > 0);
  //     if (toRight || toLeft) {
  //       this.moveLeft = index * -10;
  //     }
  //   }
  // }

  panmove(index: number, action: any) {
    this.slowSlide = true;
    const deltaX: number = action.deltaX;
    const move = deltaX * window['dpr'];
    this.translateLeft = 'translate3d(' + move + 'px,0px,0px)';
  }

  panend(index: number, action: object, moveLeft: number) {

  }
  constructor() { }

  ngOnInit() {
    this.boxWidth = this.data.length * 10;
    this.defaultImage = 'assets/lazy_default.png';
  }

}

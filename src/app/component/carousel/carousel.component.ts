import { Component, OnInit, Input } from '@angular/core';
import 'hammerjs'; // 手势

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})

export class CarouselComponent implements OnInit {
  boxWidth;
  moveLeft;
  quickSlide;
  @Input() data;

  pan(index: number, action: any) {
    this.quickSlide = true;
    const length = this.data.length;
    const type = action.type;
    const srcEventType = action.srcEvent.type;
    const maxLeft = (length - 1) * -10;
    const deltaX = action.deltaX;
    if (type === 'panleft') {
      if (this.moveLeft <= maxLeft) {
        if (srcEventType === 'pointermove') {
          this.quickSlide = false;
          const move = window['px2rem'](0 - deltaX * window['dpr']);
          this.moveLeft = this.moveLeft - move;
          if (this.moveLeft <= maxLeft - 5) {
            this.moveLeft = maxLeft - 5;
          }
        } else if (srcEventType === 'pointerup') {
          this.moveLeft = maxLeft;
        }
        return;
      }
      index = index + 1;
      this.moveLeft = index * -10;
    } else if (type === 'panright') {
      if (this.moveLeft >= 0) {
        if (srcEventType === 'pointermove') {
          this.quickSlide = false;
          const move = window['px2rem'](deltaX * window['dpr']);
          this.moveLeft = this.moveLeft + move;
          if (this.moveLeft >= 5) {
            this.moveLeft = 5;
          }
        } else if (srcEventType === 'pointerup') {
          this.moveLeft = 0;
        }
        return;
      }
      index = index - 1;
      this.moveLeft = index * -10;
    } else { // panend
      if (this.moveLeft === maxLeft - 5 || this.moveLeft === 5) {
        this.moveLeft = index * -10;
      }
    }
  }
  constructor() { }

  ngOnInit() {
    this.boxWidth = this.data.length * 10;
  }

}

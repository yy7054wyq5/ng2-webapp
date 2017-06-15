import { Injectable } from '@angular/core';

@Injectable()
export class RemService {

  constructor() { }
  setDpr(): void {
    const dpr: number = window.devicePixelRatio || 1;
    const docEl: any = document.documentElement; // 根元素
    const metaEl: any = document.querySelector('meta[name="viewport"]');
    // 假设在设计图宽度是375px，10rem等于375px，那么 1rem = 37.5px
    const rem: number = docEl.clientWidth * dpr / 10;
    // 为了达到 1rem = 20px便于计算
    // this.fontSize = this.rem/this.dpr*(20/37.5);
    let fontSize = rem / dpr; // 临时
    // 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);
    if (docEl.clientWidth >= 640) {
      fontSize = 64;
    }
    docEl.setAttribute('style', 'font-size:' + fontSize + 'px!important;');
    // 设置viewport
    metaEl.setAttribute('content', 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0');
    // 给js调用的，某一dpr下rem和px之间的转换函数
    window['rem2px'] = ((v: number) => {
      v = parseFloat(v.toString());
      return v * rem;
    });
    window['px2rem'] = ((v: number) => {
      v = parseFloat(v.toString());
      return v / rem;
    });
    window['dpr'] = dpr;
    window['rem'] = rem;
  }
}

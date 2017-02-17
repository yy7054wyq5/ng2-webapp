import { Injectable } from '@angular/core';

@Injectable()
export class RemService {

  constructor() { }

  dpr: number = window.devicePixelRatio || 1;
  docEl: any = document.documentElement;
  rem: number = this.docEl.clientWidth * this.dpr / 10;
  scale: number = 1 / this.dpr;
  fontSize: number = this.rem/this.dpr;
  fontEl: any = document.createElement('style');
  metaEl: any = document.querySelector('meta[name="viewport"]');
  setDpr(): void{
    // 设置data-dpr属性，留作的css hack之用
    this.docEl.setAttribute('data-dpr', this.dpr);
    // 动态写入样式
    this.docEl.firstElementChild.appendChild(this.fontEl);
    if(this.docEl.clientWidth>=640){
        this.fontSize = 64;
    }
    this.fontEl.innerHTML = 'html{font-size:' + this.fontSize + 'px!important;}';
    // 设置viewport
    this.metaEl.setAttribute('content', 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0');
    // 给js调用的，某一dpr下rem和px之间的转换函数
    window['rem2px'] = (v => {
      v = parseFloat(v);
      return v * this.rem;
    });
    window['px2rem'] = (v => {
      v = parseFloat(v);
      return v / this.rem;
    });
    window['dpr'] = this.dpr;
    window['rem'] = this.rem;
  }
}

import { style } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {
  elem: any = document.createElement('div');
  constructor() { }

  open(msg: string, duration?: number) {
    this.elem.innerHTML = '<div id="dialog">' +
      '<div>' + msg + '</div>' +
      '</div>';
    document.body.appendChild(this.elem);
    setTimeout(() => {
      const dialogElem = document.getElementById('dialog');
      if (dialogElem) {
        dialogElem.className = 'disappear';
      }
      setTimeout(() => {
        this.elem.remove();
      }, 300);
    }, duration || 1000);
  }

}

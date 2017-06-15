import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  doc: any = document;
  elem: any = this.doc.createElement('div');
  constructor() { }

  show() {
    this.elem.innerHTML = '<div class="ajax-loading-wrap">' +
      '<div class="ajax-loading"></div>' +
      '</div>';
    this.doc.body.appendChild(this.elem);
  }

  hide() {
    setTimeout(() => {
      this.elem.remove();
    }, 500);
  }
}

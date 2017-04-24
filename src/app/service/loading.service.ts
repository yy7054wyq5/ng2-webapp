import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  doc = document;
  elem = this.doc.createElement('div');
  constructor() { }

  show() {
    this.elem.innerHTML = '<div class="ajax-loading-wrap">' +
      '<div class="ajax-loader">' +
      '<div class="bounce1"></div>' +
      '<div class="bounce2"></div>' +
      '<div class="bounce3"></div>' +
      '</div>' +
      '</div>';
    this.doc.body.appendChild(this.elem);
  }

  hide() {
    this.elem.remove();
  }
}

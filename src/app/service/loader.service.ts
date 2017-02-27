import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

  constructor() { }
  open() {
    const loader = document.querySelector('.loader');
    loader.setAttribute('class', 'loader active');
  };
  close() {
    const loader = document.querySelector('.loader');
    loader.setAttribute('class', 'loader');
  }
}

import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[appyellowbg]'
})
export class YellowBgDirective {

  constructor(el: ElementRef) {
    // el.nativeElement.style.backgroundColor = 'yellow';
  }

}

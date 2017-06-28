import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-full-shadow',
  templateUrl: './full-shadow.component.html',
  styleUrls: ['./full-shadow.component.less']
})
export class FullShadowComponent implements OnInit, OnChanges {
  translateLeft: string;
  @Input() show: any;
  @Output() outShadowToggleValue: EventEmitter<object> = new EventEmitter<object>();

  constructor() { }

  hideShadow() {
    this.show = false;
    this.translateLeft = 'translate3d(-10rem, 0rem, 0rem)';
    this.outShadowToggleValue.emit(this.show);
  }

  ngOnChanges() {
    if (this.show) {
      this.translateLeft = 'translate3d(0rem, 0rem, 0rem)';
    }
  }

  ngOnInit() {
    if (!this.show) {
      this.hideShadow();
    }
  }

}

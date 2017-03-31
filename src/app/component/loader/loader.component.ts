import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent implements OnInit, OnChanges {
  initTop;
  @Input() isloading;
  @Input() top;
  @Input() move;
  constructor() { }

  ngOnInit() {
    this.initTop = this.top;
  }

  ngOnChanges() {
    console.log(this.move);
    this.top = this.initTop + this.move;
  }
}

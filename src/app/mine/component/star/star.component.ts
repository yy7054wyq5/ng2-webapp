import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.less']
})
export class StarComponent implements OnInit {
  totalstar: number;
  @Output() childEvent = new EventEmitter<any>();
  constructor() { }
  ngOnInit() {
    this.star(5);
  }
  star(index: number) {
    this.totalstar = index;
    this.childEvent.emit(index);
  }
}

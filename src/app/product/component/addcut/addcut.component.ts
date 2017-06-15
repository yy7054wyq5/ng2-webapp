import { DialogService } from './../../../share/service/dialog.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-addcut',
  templateUrl: './addcut.component.html',
  styleUrls: ['./addcut.component.less']
})
export class AddcutComponent implements OnInit {
  @Input() maxInventory: number; // 库存
  @Input() limitNum: number; // 限购
  @Input() count: number; // 默认数量
  // 抛出数量
  @Output() childEvent = new EventEmitter<any>();
  // count = 1;
  constructor(
    private dialog: DialogService
  ) { }

  ngOnInit() {
    if (typeof (this.count) !== 'number') {
      this.count = 1;
    }
  }
  // 增加数量
  addNum() {
    if (this.maxInventory <= this.count || this.limitNum <= this.count) {
      this.dialog.open('已达最大购买数量');
      return false;
    }else {
      this.count++;
    }
    this.childEvent.emit(this.count);
  }
  // 减少数量
  cutNum() {
    if (!this.count) {
      this.count = 1;
    } else if (this.count > 1) {
      this.count--;
    }
    this.childEvent.emit(this.count);
  }
  // 输入数量
  inputNum() {
    // console.log(this.count,this.maxInventory,this.limitNum);
    if (this.count < 1) {
      this.count = 1;
    }else if (this.count >= this.maxInventory || (this.limitNum && this.count >= this.limitNum) ) {
      if (this.limitNum) {
        this.count = this.maxInventory < this.limitNum ? this.maxInventory : this.limitNum ;
      }else {
         this.count = this.maxInventory;
      }
    }
    this.childEvent.emit(this.count);
  }
}

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RemService } from './service/rem.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [RemService]
})
export class AppComponent implements OnInit  { // 生命周期钩子
  constructor(
    private rem: RemService
  ) {}

  ngOnInit() {
    this.rem.setDpr();
    // 箭头函数会把创建函数时的this传入函数内
    // 如果不用箭头函数，此时的window绑定的函数this指向的会是window
    window.onresize = () => {
      this.rem.setDpr();
    };
  }
}

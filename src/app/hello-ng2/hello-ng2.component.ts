import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-ng2',
  templateUrl: './hello-ng2.component.html',
  styleUrls: ['./hello-ng2.component.css']
})
export class HelloNg2Component implements OnInit {

  constructor() { }//类的构造函数会在所有其它生命周期钩子之前调用。使用它来注入依赖，但是要避免用它做较重的工作。

  ngOnInit() {
  }

}

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.less']
})
export class HelloComponent implements OnInit  {//生命周期钩子
  heroes;
  title = 'app works!';
  ngOnInit() {
    this.heroes = ['leishen','chaoren'];
  }
}

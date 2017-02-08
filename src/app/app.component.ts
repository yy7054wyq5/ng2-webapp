import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit  {//生命周期钩子
  heroes;
  change;
  title = 'app works!';
  ngOnInit() {
    this.heroes = ['leishen','chaoren'];
    this.change = function (hero) {
      alert(hero);
    }
  }
}

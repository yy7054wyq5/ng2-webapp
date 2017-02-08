import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit  {//生命周期钩子
  heroes;
  showHero;
  title = 'app works!';
  ngOnInit() {
    this.heroes = [
      {
        name:'chaoren',
        age:'11',
        height:'180'
      },
      {
        name:'leishen',
        age:'111',
        height:'190'
      }
    ];
    this.showHero = function (hero) {
      alert('name:'+hero.name+',age:'+hero.age+',height:'+hero.height);
    }
  }
}

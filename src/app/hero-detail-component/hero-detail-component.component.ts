import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-detail-component',
  templateUrl: './hero-detail-component.component.html',
  styleUrls: ['./hero-detail-component.component.css']
})
export class HeroDetailComponentComponent implements OnInit {
  heroes;
  title;
  constructor() { }
  
  ngOnInit() {
    this.title = '英雄信息';
    this.heroes = [
      {
        id: 1,
        name:'chaoren',
        age:'11',
        height:'180'
      },
      {
        id: 2,
        name:'leishen',
        age:'111',
        height:'190'
      }
    ];
  }

}

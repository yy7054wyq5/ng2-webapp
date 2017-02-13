import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HeroService]
})
export class HomeComponent implements OnInit {
  heroes;
  title = 'Heroes List!';
  constructor(
    private HeroService: HeroService,
  ){}
  
  getHeroes(): void{//函数
    this.HeroService.getHeroesSlowly().then(heroes => this.heroes = heroes);//接受promise
  }

  ngOnInit() {
    this.getHeroes();//调用函数
    //onselect(hero: Hero): void {}
  }

}

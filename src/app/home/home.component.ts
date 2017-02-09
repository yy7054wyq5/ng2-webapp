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
  ngOnInit() {
    this.heroes = this.HeroService.getHeroes();
    //onselect(hero: Hero): void {}
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params ,Data } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail-component',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  providers: [HeroService]
})
export class HeroDetailComponent implements OnInit {
  hero;
  heroes;
  title;
  constructor(//类的构造函数会在所有其它生命周期钩子之前调用。使用它来注入依赖，但是要避免用它做较重的工作。
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }
  
  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.heroService.getHero(+params['id']))// (+) 操作符把路由参数的值转成数字
    .subscribe(hero => this.hero = hero)
    this.route.data
    .subscribe((data: Data) => this.title = data['title'])//接受路由中的数据
    
  }

}

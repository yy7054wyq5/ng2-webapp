import { Hero } from './../../class/hero';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params ,Data } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { HeroService } from '../../service/hero.service';
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
  data;
  constructor(//类的构造函数会在所有其它生命周期钩子之前调用。使用它来注入依赖，但是要避免用它做较重的工作。
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private location: Location,
    private http: Http,
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

    this.heroService.testGet()
      .then(data =>{
        this.data = data;
        console.log(this.data);
      });
    // this.http.get('/api/purchaseOrder/getList?fromSys=scmpcapp&lang=zh&pageIndex=1&pageSize=10&token=feed196d333adee733e6fa889c9188eb')
    //   .subscribe(response => {
    //     let aa = response.json().data;
    //     console.log(aa);
    //   },
    //     (err)=>console.log(err),
    //     ()=>console.log("Done")
    //   )
  }

}

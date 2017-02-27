import { Hero } from './../../class/hero';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params , Data } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail-component',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  providers: []
})
export class HeroDetailComponent implements OnInit {
  hero;
  heroes;
  title;
  data;
  constructor( // 类的构造函数会在所有其它生命周期钩子之前调用。使用它来注入依赖，但是要避免用它做较重的工作。
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private http: Http,
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {

  }

}

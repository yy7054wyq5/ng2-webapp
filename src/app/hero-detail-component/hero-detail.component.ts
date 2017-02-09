import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params ,Data } from '@angular/router';
import 'rxjs/add/operator/switchMap';
//import { GetInfoServiveService } from '../get-info-servive.service';

@Component({
  selector: 'app-hero-detail-component',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero;
  title;
  id;
  constructor(//类的构造函数会在所有其它生命周期钩子之前调用。使用它来注入依赖，但是要避免用它做较重的工作。
    private route: ActivatedRoute,
    private router: Router,
    //private getinfoserviveservice: GetInfoServiveService
  ) {}
  
  ngOnInit() {
    this.route.params
    //.switchMap((params: Params) => this.getinfoserviveservice.getInfo(+params['id'])])
    .subscribe((params: Params) => this.id = params['id'])
    this.route.data
    //.switchMap((data: Data) => this.title = data['title'])
    .subscribe((data: Data) => this.title = data['title'])//接受路由中的数据
    this.hero =  {
      id: 1,
      name:'chaoren',
      age:'11',
      height:'180'
    }
  }

}

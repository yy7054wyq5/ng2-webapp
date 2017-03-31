import { LoaderComponent } from './../component/loader/loader.component';
import { CarouselComponent } from './../component/carousel/carousel.component';
import { FindComponent } from './find/find.component';
import { HomeRoutingModule } from './home.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // 图片懒加载模块

import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    LazyLoadImageModule
  ],
  declarations: [
    HomeComponent,
    FindComponent,
    CarouselComponent,
    LoaderComponent
  ]
})
export class HomeModule { }

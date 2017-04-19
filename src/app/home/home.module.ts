import { FormsModule } from '@angular/forms';
import { ComponentModule } from './../component/component.module';
import { FindComponent } from './find/find.component';
import { HomeRoutingModule } from './home.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SaleComponent } from './sale/sale.component'; // 图片懒加载模块

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    LazyLoadImageModule,
    ComponentModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    FindComponent,
    SaleComponent,
  ]
})
export class HomeModule { }

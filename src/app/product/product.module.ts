import { ComponentModule } from './../component/component.module';
import { FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIndexComponent } from './index/index.component';
import { ProductListComponent } from './list/list.component';
import { ProductDetailComponent } from './detail/detail.component';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // 图片懒加载模块

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    ComponentModule,
    FormsModule,
    LazyLoadImageModule
  ],
  declarations: [
    ProductIndexComponent,
    ProductListComponent,
    ProductDetailComponent
  ]
})
export class ProductModule { }

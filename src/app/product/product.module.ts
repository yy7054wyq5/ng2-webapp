import { HelloNg2Component } from './../component/hello-ng2/hello-ng2.component';
import { ProductRoutingModule } from './product.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIndexComponent } from './index/index.component';
import { ProductListComponent } from './list/list.component';
import { ProductDetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductIndexComponent,
    ProductListComponent,
    ProductDetailComponent,
    HelloNg2Component
  ]
})
export class ProductModule { }

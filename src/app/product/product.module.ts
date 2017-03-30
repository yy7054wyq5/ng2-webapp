import { FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIndexComponent } from './index/index.component';
import { ProductListComponent } from './list/list.component';
import { ProductDetailComponent } from './detail/detail.component';

import 'hammerjs'; // 手势

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule
  ],
  declarations: [
    ProductIndexComponent,
    ProductListComponent,
    ProductDetailComponent
  ]
})
export class ProductModule { }

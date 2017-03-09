import { FormsModule } from '@angular/forms';
import { HelloNg2Component } from './../component/hello-ng2/hello-ng2.component';
import { ProductRoutingModule } from './product.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIndexComponent } from './index/index.component';
import { ProductListComponent } from './list/list.component';
import { ProductDetailComponent } from './detail/detail.component';

import { MaterialModule } from '@angular/material';
import 'hammerjs'; // 手势

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    ProductIndexComponent,
    ProductListComponent,
    ProductDetailComponent,
    HelloNg2Component
  ]
})
export class ProductModule { }

// import { HeaderComponent } from './../component/header/header.component';
import { FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIndexComponent } from './index/index.component';
import { ProductListComponent } from './list/list.component';
import { ProductDetailComponent } from './detail/detail.component';

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

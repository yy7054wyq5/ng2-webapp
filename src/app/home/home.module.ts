import { ShareModule } from './../share/share.module';
import { FormsModule } from '@angular/forms';
import { FindComponent } from './find/find.component';
import { HomeRoutingModule } from './home.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SaleComponent } from './sale/sale.component';
import { SearchComponent } from './search/search.component';
import { BranchComponent } from './branch/branch.component';
import { BranchDetailComponent } from './branch-detail/branch-detail.component';
import { PointMallComponent } from './point-mall/point-mall.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    LazyLoadImageModule,
    ShareModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    FindComponent,
    SaleComponent,
    SearchComponent,
    BranchComponent,
    BranchDetailComponent,
    PointMallComponent
  ]
})
export class HomeModule { }

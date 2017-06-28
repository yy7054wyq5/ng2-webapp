import { QrCodeComponent } from './qr-code/qr-code.component';
import { ShopCarComponent } from './shop-car/shop-car.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { HasGuideGuard } from './../share/guard/has-guide.guard';
import { IsLoginGuard } from './../share/guard/is-login.guard';
import { ComfirmComponent } from './comfirm/comfirm.component';
import { ResolverService } from './../share/service/resolver.service';
import { ProductDetailComponent } from './detail/detail.component';
import { ProductListComponent } from './list/list.component';
import { ProductIndexComponent } from './index/index.component';
import { RouterModule, Routes, ActivatedRouteSnapshot, Params } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Cookies from 'js-cookie';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductIndexComponent,
    data: {
      api: '/api/product/category',
      method: 'post'
    },
    resolve: {
      content: ResolverService
    }
  },
  {
    path: 'list',
    component: ProductListComponent,
    data: {
      api: '/api/product/list',
      method: 'get',
      urlParams: 'categoryId'
    },
    resolve: {
      content: ResolverService
    }
  },
  {
    path: 'detail/:id', // 路由器会用它来匹配浏览器地址栏中的地址，如product。
    component: ProductDetailComponent, // 导航到此路由时，路由器需要创建的组件DetailComponent
    canActivate: [],
    data: { // 用来保存诸如 页标题、面包屑以及其它只读数据
      api: '/api/product/detail/', // 接口地址
      method: 'post'
    },
    resolve: {
      content: ResolverService
    }
  },
  // 确认订单
  {
    path: 'comfirm', // 路由器会用它来匹配浏览器地址栏中的地址，如product。
    component: ComfirmComponent , // 导航到此路由时，路由器需要创建的组件DetailComponent
    canActivate: [IsLoginGuard, HasGuideGuard],
    data: { // 用来保存诸如 页标题、面包屑以及其它只读数据
      method: 'post',
      api: '/api/order/confirm', // 接口地址
      urlParams: 'tag,productId,number,cartIds,cartType',
      ajaxNeedUserId: true,
    },
    resolve: {
      content: ResolverService
    }
  },
  // 订单详情
  {
    path: 'order-detail/:id',
    component: OrderDetailComponent ,
    canActivate: [IsLoginGuard],
    data: { // 用来保存诸如 页标题、面包屑以及其它只读数据
      api: '/api/order/detail/' // 接口地址
    },
    resolve: {
      content: ResolverService
    }
  },
  {
    path: 'shop-car',
    component: ShopCarComponent ,
    canActivate: [IsLoginGuard]
  },
  {
    path: 'qr-code',
    component: QrCodeComponent ,
    canActivate: [IsLoginGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class ProductRoutingModule { }

import { ResolverService } from './../service/resolver.service';
import { AuthGuard } from './../service/auth.service';
import { ProductDetailComponent } from './detail/detail.component';
import { ProductListComponent } from './list/list.component';
import { ProductIndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const productRoutes: Routes = [
  { path: 'product',
    component: ProductIndexComponent,
    data: {
      title: '产品主页',
      api: '/api/product/category',
    },
    resolve: [ResolverService],
    children: [
      {
        path: 'list',
        component: ProductListComponent,
      },
      { path: 'detail:id', // 路由器会用它来匹配浏览器地址栏中的地址，如product。
        component: ProductDetailComponent, // 导航到此路由时，路由器需要创建的组件DetailComponent
        canActivate: [AuthGuard],
        data: { // 用来保存诸如 页标题、面包屑以及其它只读数据
          title: '产品详情',
          api: '/api/product/detail/', // 接口地址
        },
        resolve: {
          content: ResolverService
        }
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class ProductRoutingModule { }

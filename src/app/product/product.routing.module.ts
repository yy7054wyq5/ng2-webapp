import { ResolverService } from './../service/resolver.service';
import { AuthGuard } from './../guard/auth.guard';
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
      api: '/api/product/list',
      body: {
        type: 1,
        page: 1,
        pageCount: 10
      }
    },
    resolve: {
      content: ResolverService
    }
  },
  { path: 'product/list/:id',
    component: ProductListComponent
  },
  { path: 'product/detail/:id', // 路由器会用它来匹配浏览器地址栏中的地址，如product。
    component: ProductDetailComponent, // 导航到此路由时，路由器需要创建的组件DetailComponent
    canActivate: [AuthGuard],
    data: { // 用来保存诸如 页标题、面包屑以及其它只读数据
      api: '/api/product/detail/' // 接口地址
    },
    resolve: {
      content: ResolverService
    }
  },
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

import { PointMallComponent } from './point-mall/point-mall.component';
import { BranchDetailComponent } from './branch-detail/branch-detail.component';
import { BranchComponent } from './branch/branch.component';
import { SearchComponent } from './search/search.component';
import { SaleComponent } from './sale/sale.component';
import { FindComponent } from './find/find.component';
import { HomeComponent } from './home/home.component';
import { ResolverService } from './../share/service/resolver.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'find',
        component: FindComponent,
        data: {
          api: '/api/index/index',
          method: 'post',
          body: {
            page: 1
          }
        },
        resolve: {
          content: ResolverService
        }
      },
      {
        path: 'sale',
        component: SaleComponent
      },
      {
        path: 'search',
        component: SearchComponent,
        data: {
          api: '/api/product/list',
          body: {
            page: 1,
            pageCount: 10,
            type: 1
          },
        },
        resolve: {
          content: ResolverService
        }
      },
      {
        path: 'branch',
        component: BranchComponent,
        data: {
          api: '/api/branch/list',
          body: {
            page: 1,
            pageCount: 10
          }
        },
        resolve: {
          content: ResolverService
        }
      },
      {
        path: 'branch/detail/:id',
        component: BranchDetailComponent,
        data: {
          api: '/api/branch/detail/',
          method: 'post',
          body: {
            page: 1,
            pageCount: 10
          }
        },
        resolve: {
          content: ResolverService
        }
      },
      {
        path: 'pointmall',
        component: PointMallComponent,
        data: {
          api: '/api/product/credit',
          method: 'post'
        },
        resolve: {
          content: ResolverService
        }
      },
      {
        path: '',
        redirectTo: '/index/find',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class HomeRoutingModule { }

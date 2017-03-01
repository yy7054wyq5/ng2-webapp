import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './view/detail/detail.component';
import { HomeComponent } from './view/home/home.component';
import { HelloNg2Component } from './component/hello-ng2/hello-ng2.component';

import { ResolverService } from './service/resolver.service';

const appRoutes: Routes = [
  { path: 'product/:id', // 路由器会用它来匹配浏览器地址栏中的地址，如product。
    component: DetailComponent, // 导航到此路由时，路由器需要创建的组件DetailComponent
    data: { // 用来保存诸如 页标题、面包屑以及其它只读数据
      title: '产品详情',
    },
    // resolve: [ResolverService]
  },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent } // 需要显示404页面或者重定向到其它路由时，该特性非常有用
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [ResolverService],
})
export class AppRoutModule { }

import { ResolverService } from './service/resolver.service';
import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { FindComponent } from './home/find/find.component';
import { ProductListComponent } from './product/list/list.component';
import { ProductIndexComponent } from './product/index/index.component';
import { ProductDetailComponent } from './product/detail/detail.component';

const appRoutes: Routes = [
  { path: 'index',
    loadChildren: './home/home.module#HomeModule',
    canActivate: [AuthGuard], // 激活
    canLoad: [AuthGuard] // 加载
  },
  { path: 'product',
    loadChildren: './product/product.module#ProductModule',
    canActivate: [AuthGuard], // 激活
    canLoad: [AuthGuard] // 加载
  },
  { path: '',
    redirectTo: '/index/find', // 重定向
    pathMatch: 'full' },
  { path: '**',
    redirectTo: '/index/find',
    pathMatch: 'full'
    // component: HomeComponent
  }, // 需要显示404页面或者重定向到其它路由时，该特性非常有用
  // { path: 'mmaa', loadChildren: 'module-a/module-a.module#ModuleAModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [ResolverService, AuthGuard],
})
export class AppRoutModule { }

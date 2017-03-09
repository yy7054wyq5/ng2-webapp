import { ResolverService } from './share/resolver.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './service/auth.service';

import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/list/list.component';
import { ProductIndexComponent } from './product/index/index.component';
import { ProductDetailComponent } from './product/detail/detail.component';
import { HelloNg2Component } from './component/hello-ng2/hello-ng2.component';

const appRoutes: Routes = [
  { path: 'index', component: HomeComponent },
  { path: 'product',
    loadChildren: './product/product.module#ProductModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  { path: '',
    redirectTo: '/index', // 重定向
    pathMatch: 'full' },
  { path: '**',
    redirectTo: '/index',
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

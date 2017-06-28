import { GlobalParamGuard } from './share/guard/global-param.guard';
import { GlobalParamForChildGuard } from './share/guard/global-param-for-child.guard';
import { HasGuideGuard } from './share/guard/has-guide.guard';
import { WeixinLoginResolveService } from './enter/weixin-login-resolve.service';
import { ResolverService } from './share/service/resolver.service';
import { ChooseGuideComponent } from './enter/choose-guide/choose-guide.component';
import { IsLoginGuard } from './share/guard/is-login.guard';
import { RegComponent } from './enter/reg/reg.component';
import { LoginComponent } from './enter/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanLoad, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'index',
    loadChildren: './home/home.module#HomeModule',
    canActivateChild: [GlobalParamForChildGuard]
  },
  {
    path: 'product',
    loadChildren: './product/product.module#ProductModule',
    canActivateChild: [GlobalParamForChildGuard]
  },
  {
    path: 'mine',
    loadChildren: './mine/mine.module#MineModule',
    canActivate: [IsLoginGuard],
    canActivateChild: [GlobalParamForChildGuard]
  },
  {
    path: 'community',
    loadChildren: './community/community.module#CommunityModule',
    canActivateChild: [GlobalParamForChildGuard]
  },
  {
    path: 'article',
    loadChildren: './article/article.module#ArticleModule',
    canActivateChild: [GlobalParamForChildGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GlobalParamGuard],
    resolve: {
      content: WeixinLoginResolveService
    }
  },
  {
    path: 'reg',
    component: RegComponent,
    canActivate: [GlobalParamGuard],
    data: {
      title: 'title_activity_register',
      btnTxt: 'reg'
    }
  },
  {
    path: 'forget',
    component: RegComponent,
    canActivate: [GlobalParamGuard],
    data: {
      title: 'title_activity_forget_password',
      btnTxt: 'sure_update'
    }
  },
  {
    path: 'choose-guide',
    component: ChooseGuideComponent,
    canActivate: [GlobalParamGuard, HasGuideGuard],
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
    path: '',
    pathMatch: 'full',
    redirectTo: '/index/find' // 重定向
  },
  {
    path: '**',
    redirectTo: '/index/find',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [WeixinLoginResolveService, GlobalParamForChildGuard, GlobalParamGuard],
})
export class AppRoutModule { }

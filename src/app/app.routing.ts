import { HasGuideGuard } from './share/guard/has-guide.guard';
import { WeixinLoginResolveService } from './enter/weixin-login-resolve.service';
import { ResolverService } from './share/service/resolver.service';
import { ChooseGuideComponent } from './enter/choose-guide/choose-guide.component';
import { IsLoginGuard } from './share/guard/is-login.guard';
import { appTag } from '../ready';
import { RegComponent } from './enter/reg/reg.component';
import { LoginComponent } from './enter/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanLoad, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  {
    path: appTag + '/index',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: appTag + '/product',
    loadChildren: './product/product.module#ProductModule',
    // canLoad: [AuthGuard] // 加载
  },
  {
    path: appTag + '/mine',
    loadChildren: './mine/mine.module#MineModule',
    canActivate: [IsLoginGuard]
  },
  {
    path: appTag + '/community',
    loadChildren: './community/community.module#CommunityModule',
  },
  {
    path: appTag + '/article',
    loadChildren: './article/article.module#ArticleModule',
  },
  {
    path: appTag + '/login',
    component: LoginComponent,
    resolve: {
      content: WeixinLoginResolveService
    }
  },
  {
    path: appTag + '/reg',
    component: RegComponent,
    data: {
      title: 'title_activity_register',
      btnTxt: 'reg'
    }
  },
  {
    path: appTag + '/forget',
    component: RegComponent,
    data: {
      title: 'title_activity_forget_password',
      btnTxt: 'sure_update'
    }
  },
  {
    path: appTag + '/choose-guide',
    component: ChooseGuideComponent,
    data: {
      api: '/api/branch/list',
      body: {
        page: 1,
        pageCount: 10
      }
    },
    resolve: {
      content: ResolverService
    },
    canActivate: [HasGuideGuard]
  },
  {
    path: appTag + '/',
    pathMatch: 'full',
    redirectTo: appTag + '/index/find' // 重定向
  },
  {
    path: '**',
    redirectTo: appTag + '/index/find',
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
  providers: [WeixinLoginResolveService],
})
export class AppRoutModule { }

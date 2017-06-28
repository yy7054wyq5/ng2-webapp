import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

// 翻译管道
import { TranslatePipe } from './pipe/translate.pipe';

// 公共组件
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { BackTopComponent } from './component/back-top/back-top.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { SwipeMenuComponent } from './component/swipe-menu/swipe-menu.component';
import { LoadAndRefreshComponent } from './component/load-and-refresh/load-and-refresh.component';
import { FullShadowComponent } from './component/full-shadow/full-shadow.component';
import { TopicListComponent } from './component/topic-list/topic-list.component';
import { TopicCommentListComponent } from './component/topic-comment-list/topic-comment-list.component';
import { GuideListComponent } from './component/guide-list/guide-list.component';
import { BigViewComponent } from './component/big-view/big-view.component';

// 公共服务
import { LoadingService } from './service/loading.service';
import { CacheService } from './service/cache.service';
import { RemService } from './service/rem.service';
import { StorageService } from './service/storage.service';
import { ResolverService } from './service/resolver.service';
import { ApiService } from './service/api.service';
import { DialogService } from './service/dialog.service';

// 公共路由守卫
import { HasGuideGuard } from './guard/has-guide.guard';
import { IsLoginGuard } from './guard/is-login.guard';

export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y',
    });
    return mc;
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LazyLoadImageModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    BackTopComponent,
    TranslatePipe,
    ProductListComponent,
    SwipeMenuComponent,
    LoadAndRefreshComponent,
    FullShadowComponent,
    TopicListComponent,
    BigViewComponent,
    TopicCommentListComponent,
    GuideListComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    BackTopComponent,
    TranslatePipe,
    ProductListComponent,
    SwipeMenuComponent,
    LoadAndRefreshComponent,
    FullShadowComponent,
    TopicListComponent,
    BigViewComponent,
    TopicCommentListComponent,
    GuideListComponent
  ],
  providers: [
    ApiService,
    StorageService,
    ResolverService,
    RemService,
    CacheService,
    LoadingService,
    DialogService,
    TranslatePipe,
    HasGuideGuard,
    IsLoginGuard,
    {
      // hammer instantion with custom config
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ]
})
export class ShareModule { }

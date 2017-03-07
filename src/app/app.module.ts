/*公共模块*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import 'hammerjs'; // 手势

import { AppRoutModule } from './app.routing'; // 路由模块
import { LazyLoadImageModule } from 'ng2-lazyload-image'; // 图片懒加载模块
import { CarouselModule } from 'ng2-bootstrap'; // 轮播图模块
import { ShareModule } from './share/share.module';
import { ProductModule } from './product/product.module';

import { AppComponent } from './app.component'; // 根组件
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './home/home.component';
/*产品模块*/
import { ProductListComponent } from './product/list/list.component';
import { ProductIndexComponent } from './product/index/index.component';
import { ProductDetailComponent } from './product/detail/detail.component';
import { HelloNg2Component } from './component/hello-ng2/hello-ng2.component';

import { LoaderComponent } from './component/loader/loader.component';
import { YellowBgDirective } from './directive/yellowbg.directive';

@NgModule({
  // 声明本模块中拥有的视图类。 Angular 有三种视图类：组件、指令和管道。
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    LoaderComponent,
    YellowBgDirective
  ],
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ProductModule, // 子模块要在AppRoutModule之前
    LazyLoadImageModule,
    CarouselModule,
    ShareModule,
    MaterialModule,
    AppRoutModule, // 保持主路由模块在最后
  ],
  // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分
  providers: [],
  // 指定应用的主视图（称为根组件），它是所有其它视图的宿主。只有根模块才能设置bootstrap属性
  bootstrap: [AppComponent]
})
export class AppModule { }

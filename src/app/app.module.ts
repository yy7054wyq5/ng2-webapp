/*公共模块*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutModule } from './app.routing'; // 路由模块
import { LazyLoadImageModule } from 'ng2-lazyload-image'; // 图片懒加载模块
import { CarouselModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component'; // 根组件
import { FooterComponent } from './component/footer/footer.component';
import { DetailComponent } from './view/detail/detail.component';
import { HomeComponent } from './view/home/home.component';
import { HelloNg2Component } from './component/hello-ng2/hello-ng2.component';

import { LoaderService } from './service/loader.service';
import { StorageService } from './service/storage.service';
import { ApiService } from './service/api.service';
import { ResolverService } from './service/resolver.service';
import { CarouselComponent } from './component/carousel/carousel.component';

@NgModule({
  // 声明本模块中拥有的视图类。 Angular 有三种视图类：组件、指令和管道。
  declarations: [
    AppComponent,
    HelloNg2Component,
    FooterComponent,
    DetailComponent,
    HomeComponent,
    CarouselComponent
  ],
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutModule,
    LazyLoadImageModule,
    CarouselModule
  ],
  // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分
  providers: [LoaderService, ApiService, StorageService],
  // 指定应用的主视图（称为根组件），它是所有其它视图的宿主。只有根模块才能设置bootstrap属性
  bootstrap: [AppComponent]
})
export class AppModule { }

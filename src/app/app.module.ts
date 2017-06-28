/*基础模块*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from './share/share.module'; // 公共模块（包含组件，服务）
import { AppRoutModule } from './app.routing'; // 路由模块
import { HomeModule } from './home/home.module'; // 首页模块
import { AppComponent } from './app.component'; // 根组件
import 'hammerjs'; // 手势
import { LoginComponent } from './enter/login/login.component';
import { RegComponent } from './enter/reg/reg.component';
import { ChooseGuideComponent } from './enter/choose-guide/choose-guide.component';

@NgModule({
  // 声明本模块中拥有的视图类。 Angular 有三种视图类：组件、指令和管道。
  declarations: [
    AppComponent,
    LoginComponent,
    RegComponent,
    ChooseGuideComponent
  ],
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeModule,
    ShareModule,
    BrowserAnimationsModule,
    AppRoutModule, // 保持主路由模块在最后
  ],
  // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分
  providers: [],
  // 指定应用的主视图（称为根组件），它是所有其它视图的宿主。只有根模块才能设置bootstrap属性
  bootstrap: [AppComponent]
})
export class AppModule {
}

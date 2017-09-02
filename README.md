# appbuilder -- build by Angular

本项目是以[angular-cli](https://github.com/angular/angular-cli)为基础，适用于移动web的项目。

## 一、包含的功能

* [rem 布局](#rem-布局)：在根组件调用rem.service，动态计算html的font-size
* [封装http请求](#封装的http请求)：所有的请求都从这里走，以便加公共参数或者做加密操作
* [路由中请求(resolver)](#resolver就是一个service)：在进入页面前获取数据
* 图片懒加载，使用[ng-lazyload-image](https://github.com/tjoskar/ng-lazyload-image)
* [storage](#storage)：本地存储
* 请求代理配置：项目根目录下proxy.conf.json中配置
* 使用gulp运行dist内代码，在api.service中切换请求地址
* [接口约定参数说明](#接口约定参数说明)
* [轮播回弹](#轮播回弹)：幻灯片
* [返回顶部](#返回顶部)：html插入back-top组件
* [顶部](#顶部)
* [底部](#底部)
* [全屏遮罩](#全屏遮罩)
* [导购列表](#导购列表)
* [下拉刷新和上滑加载（翻页）](#下拉刷新和上滑加载（翻页）)

## 二、项目特殊说明

* 1.因需要在启动app前获取app配置信息，所以在路由路径上手动添加前缀。在组件中routerlink也需要手动加前缀。
* 2.npm start 启动本地开发环境，地址：http://localhost:4200/#/index?appTag=CcYgnu（改用hash模式以便应对多商户多短链接的问题）
* 3.在组件内部调用js-cookie的方法，jquery一样

```javascript
import * as Cookie from 'js-cookie';
```

## 三、项目结构说明

* app
* -- article 文章模块
* -- community 论坛模块
* -- enter 登录、注册、找回密码，非模块仅页面，属于主模块
* &nbsp;&nbsp;-- weixin-login-resolve.service 微信登录的特殊处理
* -- home 首页模块
* -- mine 个人中心模块
* -- product 项目的product模块
* -- share 项目公共模块，包含组件和服务
* &nbsp;&nbsp;-- service 公共服务，在根模块引入service.module即可
* &nbsp;&nbsp;-- animation 转场动画，来自大漠穷秋老师的nicefish
* &nbsp;&nbsp;-- guard 路由守卫(service)，最新的angular-cli已将此独立出来，可以单独生成,使用前要在模块引入component.mudule
* &nbsp;&nbsp;-- component 公共组件，使用前要在模块引入component.mudule
* &nbsp;&nbsp;-- pipe 公共管道，使用前要在模块引入component.mudule

## 四、使用方法

* package.json配置：

* "start": "ng serve --proxy-config proxy.conf.json --host 192.168.1.29 --port 80"

* host 为本机IP,port为端口

* npm start 后，手机在同局域网下可访问该IP

### 1.rem 布局

在根组件调用一次就行。

```javascript
this.rem.setDpr();
window.onresize = () => {
  this.rem.setDpr();
};
```

[返回文档顶部](#包含的功能)

### 2.下拉刷新和上滑加载（翻页）

* html

```html
<app-load-and-refresh [url]="'/api/index/index'" [body]="body" [dataKey]="'products'" (onRefresh)="refreshData($event)" (onLoad)="loadData($event)" [disabledRefresh]="true" [disabledLoad]="true">
  <!--url: 请求地址，默认get请求-->
  <!--body：请求参数-->
  <!--dataKey:请求返回content内的数据节点名，不写就返回content节点数据-->
  <!--(onRefresh)="refreshData($event)"：父组件绑定的刷新事件-->
  <!--(onLoad)="loadData($event)"：父组件绑定的翻页事件-->
  <!--class="refresh-content"为组件内嵌tag，不可删除-->
  <!--disabledRefresh:为true就关闭刷新，不使用该接口或为false即为开启-->
  <!--disabledLoad:为true就关闭翻页，不使用该接口或为false即为开启-->
  <div class="refresh-content">
    <!--在这里放入需加载数据的html结构-->
    <div *ngFor="let item of list;let idx = index"></div>
  </div>
</app-load-and-refresh>
```

* TS

```javascript
export class FindComponent implements OnInit {
  list;
  refreshData(action) {
    // 从loader组件返回action
    this.list = action; //返回赋值
  }

  loadData(action) {
    this.list = this.list.concat(action);
  }
  constructor(
  ) { };

  ngOnInit() {
  }
}

```

[返回文档顶部](#包含的功能)

### 3.轮播回弹

* html

```html
<app-carousel [data]="topCarousel" [interval]="3000" [height]="7.31" [width]="10" *ngIf="topCarousel" hasLink="true">
</app-carousel>
<!--data：元素为对象的数组，内部实现需根据接口更改-->
<!--interval：轮播间隔时间，单位为毫秒-->
<!--height：高度,单位rem-->
<!--width：宽度,单位rem-->
<!--hasLink: 为true则可以点击跳转页面，否则就是一般的轮播图-->
```

[返回文档顶部](#包含的功能)

### 4.resolver

* 路由配置

```javascript
{ 
  path: 'product',
  component: ProductIndexComponent,
  data: {
    api: '/api/product/list', // 接口地址
    ajaxNeedUserId: true, // 请求是否需要用户ID
    urlParams: 'key1,key2', // 从url上获取指定的参数和值
    body: { // 接口参数
      type: 1,
      page: 1,
      pageCount: 10
    }
  },
  resolve: {
    content: ResolverService // 对应的服务
  }
},
```

* TS

```javascript
export class ProductIndexComponent implements OnInit {
  title;
  detail;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(res => {
        this.detail = res['content'];
        this.title = res['title'];
      });
  }

}
```

[返回文档顶部](#包含的功能)

### 5.封装的http请求

* TS

```javascript
export class ProductIndexComponent implements OnInit {
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api
      .ajax({
        method: 'get',
        url: '、api/index/appinfo',
        downNewUserInfo: true, // 是否更新本地的用户信息
        body: {
          // 参数
        }
      })
      .subscribe(res => {
        // do something
      });
  }

}
```

[返回文档顶部](#包含的功能)

### 6.storage

* TS

```javascript
export class ProductIndexComponent implements OnInit {
  constructor(
    private storage: StorageService
  ) { }

  ngOnInit() {
    // 存放
    this.storage.put({
      type: 'localStorage', // 也可以是sessionStorage
      key: 'appinfo',
      data: [
        // ...
      ]
    });
    // 获取
    this.storage.get('appinfo');
    // 移除
    this.storage.remove('appinfo,id');
    // 清空
    this.storage.remove(); // 清空localStorage和sessionStorage
  }

}
```

[返回文档顶部](#包含的功能)

### 7.返回顶部

* HTML

```html
<app-back-top></app-back-top>
```

[返回文档顶部](#包含的功能)

### 8.顶部

```html
<app-header [hasBack]="true" [hasCar]="true" [autoNav]="true" [headerTitle]="'标题'" [hasBottom]="true">
  <!--hasBack：是否有返回按钮-->
  <!--hasCar:是否有购物车按钮-->
  <!--autoNav：是否有默认的首页菜单-->
  <!--headerTitle：标题-->
  <!--hasBottom:是否有底部线-->
  <div class="header-content"></div>
  <!--放自定义内容-->
</app-header>
```

[返回文档顶部](#包含的功能)

### 9.底部

```html
<app-footer></app-footer>
```

[返回文档顶部](#包含的功能)

### 10.导购列表

```html
<app-guide-list [guides]="guides" [toggle]="toggle" (outGuideToggleValue)="outGuideToggleValue($event)"></app-guide-list>
<!--guides:导购数据-->
<!--toggle:是否显示导购列表-->
<!--outGuideToggleValue:toggle的返回值-->
```

```javascript
outGuideToggleValue(action) {
  this.toggle = action.toggle;
  this.guide = action.guide; // 选中的导购信息
}
```

[返回文档顶部](#包含的功能)

### 11.全屏遮罩

```html
<app-full-shadow [show]="toggle" (outShadowToggleValue)="outShadowToggleValue($event)">
<!--show:是否显示遮罩-->
<!--outShadowToggleValue：用于接收toggle的返回值-->
</app-full-shadow>
```

```javascript
outShadowToggleValue(action) {
  this.toggle = action; // boolen
}
```

[返回文档顶部](#包含的功能)

### 12.滚动导航

  ```html
  <app-swipe-menu [productList]="productList" [url]="'/api/product/list'" [categoryId]="'categoryId'" (childEvent)="getChildEvent($event)"  [inputId]='true'>
  <!--productList:导航数据数据-->
  <!--categoryId:请求时的分类参数，为字符串；不传默认categoryId-->
  <!--url:点击导航请求数据的地址-->
  <!--getChildEvent:父组件接受子组件的数据，有请求返回请求结果，无url时，返回该导航id-->
  <!--inputId:可以不传，当为true时，返回id-->
</app-swipe-menu>
  ```

  ```Ts
  getChildEvent(content) {
    console.log(content);// 请求对象或者导航id
  }
  ```

[返回文档顶部](#包含的功能)

### 13.产品列表

  ```html
  <app-product-list [productList]="products" [disBlock]="true" [productType]='promotion'>
  <!--productList:产品数据数组-->
  <!--disBlock:样式显示true:块状;false:条状-->
  <!--productType:产品类型。可以不传。默认普通产品，point:积分产品;promotion:促销产品-->
  </app-product-list>

  ```

[返回文档顶部](#包含的功能)

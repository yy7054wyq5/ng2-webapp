# Ng2CliDemo

本项目是以[angular-cli](https://github.com/angular/angular-cli)为基础，适用于移动web的开源项目。且已经升级到angular4.0, angular-cli也为最新的。

# 包含的功能

* 1.rem 布局：在根组件调用rem.service，动态计算html的font-size
* 2.下拉加载：loader组件,在父组件插入loader组件,利用output传输数据
* 3.轮播回弹：carousel组件，自定义轮播间隔，高和宽以及传入的数据
* 4.封装http请求
* 5.路由中请求(resolve)
* 6.请求代理配置
* 7.图片懒加载，使用[ng-lazyload-image](https://github.com/tjoskar/ng-lazyload-image)

# 使用方法

### 下拉加载

* html
```html
<app-loader [url]="'/api/index/index'" [method]="'get'" [body]="body" (onReceive)="receiveTheData($event)">
  <!--url: 请求地址-->
  <!--method：请求方法-->
  <!--body：请求参数-->
  <!--(onReceive)="receiveTheData($event)"：父组件绑定的事件-->
  <!--class="loader-content"为组件内嵌tag，不可删除-->
  <div class="loader-content">
  <!--在这里放入需加载数据的html结构-->
  </div>
</app-loader>
  ```
* TS
```javascript
export class FindComponent implements OnInit {
  list;
  body = {
    appId: 11,
    page: 1
  };
  receiveTheData(action) {
    // 从loader组件返回action
    // this.list = action.hotProducts; //返回赋值
  }
  constructor(
  ) { };

  ngOnInit() {
  }
}

```

### 轮播回弹

* html
```html
<app-carousel [data]="topCarousel" [interval]="3000" [height]="7.31" [width]="10" *ngIf="topCarousel"></app-carousel>
<!--data：元素为对象的数组，内部实现需根据接口更改-->
<!--interval：轮播间隔时间，单位为毫秒-->
<!--height：高度,单位rem-->
<!--width：宽度,单位rem-->
```
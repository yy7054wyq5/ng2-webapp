import { ShareModule } from './../share/share.module';
import { FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIndexComponent } from './index/index.component';
import { ProductListComponent } from './list/list.component';
import { ProductDetailComponent } from './detail/detail.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';  // 图片懒加载模块
import { SizeComponent } from './component/size/size.component';
import { AddcutComponent } from './component/addcut/addcut.component';
import { ComfirmComponent } from './comfirm/comfirm.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ShopCarComponent } from './shop-car/shop-car.component';
import { QrCodeComponent } from './qr-code/qr-code.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    ShareModule,
    FormsModule,
    LazyLoadImageModule
  ],
  declarations: [
    ProductIndexComponent,
    ProductListComponent,
    ProductDetailComponent,
    SizeComponent,
    AddcutComponent,
    ComfirmComponent,
    OrderDetailComponent,
    ShopCarComponent,
    QrCodeComponent,
  ]
})
export class ProductModule { }

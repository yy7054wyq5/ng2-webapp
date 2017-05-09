import { IndexComponent } from './index/index.component';
import { MineRoutingModule } from './mine.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MineRoutingModule,
  ],
  declarations: [
    IndexComponent
  ]
})
export class MineModule { }

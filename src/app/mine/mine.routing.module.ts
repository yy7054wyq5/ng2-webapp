import { IndexComponent } from './index/index.component';
import { ResolverService } from './../service/resolver.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const mineRoutes: Routes = [
  { path: '',
    component: IndexComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mineRoutes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class MineRoutingModule { }

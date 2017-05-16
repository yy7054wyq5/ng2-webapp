import { AppInfoService } from './../service/app-info.service';
import { SaleComponent } from './sale/sale.component';
import { FindComponent } from './find/find.component';
import { HomeComponent } from './home/home.component';
import { ResolverService } from './../service/resolver.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const appInfo = new AppInfoService;
const appTag = appInfo.tag();

const homeRoutes: Routes = [
  {
    path: appTag + '/index',
    component: HomeComponent,
    children: [
      {
        path: 'find',
        component: FindComponent,
      },
      {
        path: 'sale',
        component: SaleComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class HomeRoutingModule { }

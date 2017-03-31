import { FindComponent } from './find/find.component';
import { HomeComponent } from './home/home.component';
import { ResolverService } from './../service/resolver.service';
import { AuthGuard } from './../guard/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const homeRoutes: Routes = [
  {
    path: 'index',
    component: HomeComponent,
    children: [
      {
        path: 'find',
        component: FindComponent,
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

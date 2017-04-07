import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackTopComponent } from './back-top/back-top.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    BackTopComponent
  ],
  exports:[
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    BackTopComponent
  ]
})
export class ComponentModule { }
